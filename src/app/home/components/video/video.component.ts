import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { VideoService } from '../../../shared/services/video.service';
import { Video } from '../../../shared/models/video';
import { SubtitleWord, WordList } from '../../../shared/models/subtitleWord';
import { Flashcard } from '../../../shared/models/Flashcard';
import { MatDialog } from '@angular/material';
import { AddFlashcardComponent } from '../add-flashcard/add-flashcard.component';
import { FlashcardsService } from '../../../shared/services/flashcards.service';
import { Subscription } from 'rxjs';
import { UnsubscribeComponent } from '../../../shared/components/unsubscriber/unsubscribe.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent extends UnsubscribeComponent implements OnInit {
  video: Video;
  subtitlesList: SubtitleWord[] = [];
  subtitlesListHtml: SubtitleWord[] = [];
  secondSubtitlesList: SubtitleWord[] = [];
  isVideoGet = false;
  subscriptions: Subscription[] = [];

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private flashcardsService: FlashcardsService
  ) {
    super();
  }

  private static parseTimestamp(timestamp: string): number {
    if (timestamp) {
      const matchList: string[] = timestamp.match(/^(?:([0-9]+):)?([0-5][0-9]):([0-5][0-9](?:[.,][0-9]{0,3})?)/);
      const radix = 10;
      const emptyStamp = '0';

      if (!matchList) {
        throw new Error('Invalid timestamp format: ' + timestamp);
      }

      const hoursMatch: string = matchList[1] || emptyStamp;
      const minutesMatch: string = matchList[2] || emptyStamp;
      const secondsMatch: string = matchList[3] || emptyStamp;

      const hours = parseInt(hoursMatch, radix);
      const minutes = parseInt(minutesMatch, radix);
      const seconds = parseFloat(secondsMatch.replace(',', '.'));

      const isGetTime: boolean = !!((hours || hours === 0) && (minutes || minutes === 0) && (seconds || seconds === 0));

      return isGetTime ? seconds + 60 * minutes + 60 * 60 * hours : null;
    }

    return null;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.pipe(
        switchMap((params) => {
          if (params && params.get('id')) {
            const id: number = Number(params.get('id'));

            return this.videoService.getVideo(id);
          }
        })
      ).subscribe((video: Video) => {
        this.video = video;
        this.isVideoGet = true;

        if (this.video) {
          this.getSubtitle(this.video.enSubtitlesSrc);
          this.getSubtitle(this.video.ruSubtitlesSrc, false);
        }
      })
    );
  }

  private getSubtitle(subtitleSrc: string, isFirstTrack: boolean = true) {
    this.subscriptions.push(
      this.videoService.getSubtitleText(subtitleSrc)
        .subscribe((subtitleText: string) => {
          if (subtitleText) {
            this.handleSubtitleText(subtitleText, isFirstTrack);
          }
        }, (error) => {
          console.log(error);
        })
    );
  }

  private handleTrackEvents(track, isFirstTrack: boolean = true) {
    const video: HTMLMediaElement = document.querySelector('video');
    const tracks: NodeListOf<HTMLElement> = video.querySelectorAll('track');
    console.log(tracks);

    video.addEventListener('loadedmetadata', () => {
      track.addEventListener('cuechange', (e) => {
        console.log(e);
        const activeCues: TextTrackCueList = e && e.target && e.target.activeCues;
        const activeCue: TextTrackCue = activeCues[0];

        if (activeCue && activeCue.text) {
          if (isFirstTrack) {
            this.subtitlesList.forEach((line: SubtitleWord, index: number) => {
              line.active = line.text === activeCue.text;

              if (this.secondSubtitlesList[index]) {
                this.secondSubtitlesList[index].active = line.active;
              }
            });
            console.log(this.subtitlesList);
          }
        }
      });
    });
  }

  private createSubtitlesTrack(cueList, isFirstTrack: boolean = true) {
    if (isFirstTrack) {
      const video: HTMLMediaElement = document.querySelector('video');
      const label: string = isFirstTrack ? 'En' : 'Ru';
      const language: string = isFirstTrack ? 'en' : 'ru';
      const track = video.addTextTrack('subtitles', label, language);

      track.mode = 'showing';

      Object.keys(cueList).map((key: string) => {
        const cue: VTTCue = cueList[key];
        track.addCue(cue);
      });
      console.log(track);

      this.handleTrackEvents(track, isFirstTrack);
    }
  }

  private handleSubtitleText(subtitleText: string, isFirstTrack: boolean = true) {
    let startTime;
    let endTime;

    const identifierPattern: RegExp = /^([0-9]+)$/;
    const timeCodePattern: RegExp = /^([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)$/;
    const lines = subtitleText.split(/\r?\n/);

    const cueList = {};

    for (let i = 0; i < lines.length; i++) {
      const identifier = identifierPattern.exec(lines[i]);
      if (identifier) {
        i++;
        const timeCode = timeCodePattern.exec(lines[i]);

        if (timeCode && identifier[0]) {
          startTime = VideoComponent.parseTimestamp(timeCode[1]);
          endTime = VideoComponent.parseTimestamp(timeCode[2]);
        }
        if (timeCode && i < lines.length) {
          i++;
          let text = lines[i];

          while (lines[i + 1] !== '' && i < lines.length) {
            text = text + '\n' + lines[i + 1];
            i++;
          }

          if (isFirstTrack) {
            cueList[identifier[0]] = new VTTCue(
              startTime,
              endTime,
              text
            );
          }


          const wordList: WordList[] = this.geSubtitleWordLists(text);
          const subtitle: SubtitleWord = new SubtitleWord( startTime, endTime, text, wordList, false);

          if (isFirstTrack) {
            this.subtitlesList.push(subtitle);
          } else {
            this.secondSubtitlesList.push(subtitle);
          }
        }
      }
    }

    this.createSubtitlesTrack(cueList, isFirstTrack);
  }

  private geSubtitleWordLists(text: string): WordList[] {
    const resultList: WordList[] = [];
    const baseList: string[] = text.split(' ');

    baseList.forEach((word: string) => {
      if (word.includes('\n')) {
        const wordsList: string[] = word.split('\n');

        wordsList.forEach((wordItem, index) => {
          const isNewLine = index !== wordsList.length - 1;
          const wordList: WordList = this.geSubtitleWordList(wordItem, isNewLine);
          resultList.push(wordList);
        });
      } else {
        const wordList: WordList = this.geSubtitleWordList(word);
        resultList.push(wordList);
      }
    });

    return resultList;
  }

  private geSubtitleWordList(word: string, isNewLine: boolean = false): WordList {
    let wordForTranslate: string;
    let restText = '';

    if (word.match(/(’|,|\.|:|;|"|'|!|\?)/g)) {
      wordForTranslate = word.slice(0, word.length - 1);
      restText = word.slice(word.length - 1);
    } else {
      wordForTranslate = word;
    }

    return new WordList(word, wordForTranslate, restText, isNewLine);
  }

  addFlashcard(word: WordList, line: SubtitleWord) {
    const clearWord = word.wordForTranslate.replace('.', '');
    const imageSrc = this.getImage();

    this.getTranslate(word.wordForTranslate);

    const dialogRef = this.dialog.open(AddFlashcardComponent, {
      data: {
        word: clearWord,
        text: line.text,
        link: location.href,
        image: imageSrc
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((flashCard: Flashcard) => {
        if (flashCard) {
          this.flashcardsService.addFlashCard(flashCard)
            .subscribe((flashCardFromRequest: Flashcard) => {
              console.log(flashCardFromRequest);
            });
        }
      })
    );
  }

  getImage() {
    const video: CanvasImageSource = document.querySelector('video');
    const canvas = document.createElement('canvas');
    canvas.getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();
  }

  getTranslate(word: string = '') {
    this.flashcardsService.getTranslate(encodeURI(word))
      .subscribe((response) => {
        console.log(response);
      });
  }
}
