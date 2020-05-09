import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

import {VideoService} from '../services/video.service';
import {Video} from '../models/video';
import {Subtitle} from '../models/subtitle';
import {Flashcard} from '../models/Flashcard';
import {MatDialog} from '@angular/material';
import {AddFlashcardComponent} from '../add-flashcard/add-flashcard.component';
import {FlashcardsService} from '../services/flashcards.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video: Video;
  subtitlesList: Subtitle[] = [];
  subtitlesListHtml: Subtitle[] = [];
  secondSubtitlesList: Subtitle[] = [];
  isVideoGet = false;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private flashcardsService: FlashcardsService
  ) { }

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
    this.route.paramMap.pipe(
      switchMap((params) => {
        if (params && params.get('id')) {
          const id = Number(params.get('id'));

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
    });
  }

  private getSubtitle(subtitleSrc: string, isFirstTrack: boolean = true) {
    this.videoService.getSubtitleText(subtitleSrc)
      .subscribe((subtitleText: string) => {
        if (subtitleText) {
          this.handleSubtitleText(subtitleText, isFirstTrack);
        }
      }, (error) => {
        console.log(error);
      });
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
            this.subtitlesList.forEach((line: Subtitle, index: number) => {
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
        const timecode = timeCodePattern.exec(lines[i]);

        if (timecode && identifier[0]) {
          startTime = VideoComponent.parseTimestamp(timecode[1]);
          endTime = VideoComponent.parseTimestamp(timecode[2]);
        }
        if (timecode && i < lines.length) {
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


          const wordList = this.geSubtitleWordList(text);
          const subtitle: Subtitle = new Subtitle( startTime, endTime, text, wordList, false);

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

  private geSubtitleWordList(text: string): string[] {
    return text.split(' ');
  }

  addFlashcard(word: string = '') {
    console.log('add flashcard: ', word);
    const clearWord = word.replace('.', '');

    const dialogRef = this.dialog.open(AddFlashcardComponent, {
      data: {
        word: clearWord
      }
    });

    dialogRef.afterClosed().subscribe((flashCard: Flashcard) => {
      this.flashcardsService.addFlashCard(flashCard)
        .subscribe((flashCardFromRequest: Flashcard) => {
          console.log(flashCardFromRequest);
        });
    });
  }

}
