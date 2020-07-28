import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { VideoService } from '../../../shared/services/video.service';
import { Episode, Season, Video } from '../../../shared/models/video';
import { SubtitleWord, WordList } from '../../../shared/models/subtitleWord';
import { FlashcardsService } from '../../../shared/services/flashcards.service';
import { Subscription } from 'rxjs';
import { UnsubscribeComponent } from '../unsubscriber/unsubscribe.component';
import {
  lineFeedRegExp,
  parseSubtitleTimeRegExp,
  subtitleSplittersRexExp,
  subtitleTimeCodeRexExp,
  textStartedWithNumberRegExp
} from '../../../shared/data/regularExpressions';
import { Const } from '../../../shared/data/const';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent extends UnsubscribeComponent implements OnInit {
  video: Episode;
  subtitlesList: SubtitleWord[] = [];
  secondSubtitlesList: SubtitleWord[] = [];
  isVideoGet = false;
  subscriptions: Subscription[] = [];

  private episodeId: string;
  private seasonId: string;
  private videoId: string;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private flashcardsService: FlashcardsService
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.pipe(
        switchMap((params) => {
          if (params && params.get('episodeId')) {
            this.videoId = params.get('videoId');
            this.seasonId = params.get('seasonId');
            this.episodeId = params.get('episodeId');

            return this.videoService.getVideo(this.videoId);
          }
        })
      ).subscribe((video: Video) => {
        // TODO: for refactoring getting particular video from server
        const season: Season = video.seasons
          .find((seasonItem: Season) => seasonItem.id === this.seasonId);
        this.video = season.episodesList.find(episode => episode.id === this.episodeId);
        this.isVideoGet = true;

        if (this.video) {
          this.getSubtitle(this.video.enSubtitlesSrc, true);
          this.getSubtitle(this.video.ruSubtitlesSrc);
        }
      })
    );
  }

  getTranslate(word: string = Const.EMPTY_STRING) {
    this.flashcardsService.getTranslate(encodeURI(word))
      .subscribe((response) => {
        console.log(response);
      });
  }

  private getSubtitle(subtitleSrc: string, isFirstTrack: boolean = false) {
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
    if (isFirstTrack) {
      const video: HTMLMediaElement = document.querySelector('video');
      const tracks: NodeListOf<HTMLElement> = video.querySelectorAll('track');

      video.addEventListener('loadedmetadata', () => {
        track.addEventListener('cuechange', (e) => {
          const activeCues: TextTrackCueList = e && e.target && e.target.activeCues;
          const activeCue: TextTrackCue = activeCues[0];

          this.subtitlesList.forEach((line: SubtitleWord, index: number) => {
            if (activeCue && activeCue.text) {
              line.active = line.text === activeCue.text;

              if (this.secondSubtitlesList[index]) {
                this.secondSubtitlesList[index].active = line.active;
              }
            } else if (line.active) {
              line.active = false;
            }
          });
        });
      });
    }
  }

  private createSubtitlesTrack(cueList, isFirstTrack: boolean = true) {
    if (isFirstTrack) {
      const video: HTMLMediaElement = document.querySelector('video');
      const label: string = isFirstTrack ? 'En' : 'Ru';
      const language: string = isFirstTrack ? 'en' : 'ru';
      const track = video.addTextTrack('subtitles', label, language);

      track.mode = 'hidden';

      Object.keys(cueList).map((key: string) => {
        const cue: VTTCue = cueList[key];

        track.addCue(cue);
      });

      this.handleTrackEvents(track, isFirstTrack);
    }
  }

  private handleSubtitleText(subtitleText: string, isFirstTrack: boolean = true) {
    const cueList = {};
    const lines = subtitleText.split(lineFeedRegExp);

    lines.forEach((line, index) => {
      const identifier = textStartedWithNumberRegExp.exec(line);
      const mainStringIdentifier = identifier && identifier[0];

      if (mainStringIdentifier) {
        index++;
        const timeCode = subtitleTimeCodeRexExp.exec(lines[index]);

        if (timeCode && index < lines.length) {
          index++;
          const { startTime, endTime, text } = this.getSubtitlesInfo(timeCode, lines, index);

          if (isFirstTrack) {
            cueList[mainStringIdentifier] = new VTTCue(
              startTime,
              endTime,
              text
            );
          }

          this.setSubtitlesList(text, startTime, endTime, isFirstTrack);
        }
      }
    });

    this.createSubtitlesTrack(cueList, isFirstTrack);
  }

  private getSubtitlesInfo(timeCode, lines, index): {startTime, endTime, text} {
    const startTime = this.parseTimestamp(timeCode[1]);
    const endTime = this.parseTimestamp(timeCode[2]);
    const text = this.getSubtitleText(lines, index);

    return {
      startTime,
      endTime,
      text
    };
  }

  private setSubtitlesList(text, startTime, endTime, isFirstTrack) {
    const wordList: Array<WordList[]> = this.geSubtitleWordLists(text);
    const subtitle: SubtitleWord = new SubtitleWord(startTime, endTime, text, wordList, false);

    if (isFirstTrack) {
      this.subtitlesList.push(subtitle);
    } else {
      this.secondSubtitlesList.push(subtitle);
    }
  }

  private getSubtitleText(lines, index) {
    let text = lines[index];

    while (lines[index + 1] && index < lines.length) {
      text = text + Const.LINE_FEED + lines[index + 1];
      index++;
    }

    return text;
  }

  private geSubtitleWordLists(text: string): Array<WordList[]> {
    const resultList: Array<WordList[]> = [];
    const multipleLines = text.split(Const.LINE_FEED);

    multipleLines.forEach(lineText => {
      const lineList: WordList[] = [];
      const baseList: string[] = lineText.split(Const.SPACE);

      baseList.forEach((word: string) => {
        const wordList: WordList = this.geSubtitleWordList(word);

        lineList.push(wordList);
      });

      resultList.push(lineList);
    });

    return resultList;
  }

  private geSubtitleWordList(word: string, isNewLine: boolean = false): WordList {
    let wordForTranslate: string;
    let restText: string = Const.EMPTY_STRING;

    if (word.match(subtitleSplittersRexExp)) {
      wordForTranslate = word.slice(0, word.length - 1);
      restText = word.slice(word.length - 1);
    } else {
      wordForTranslate = word;
    }

    return new WordList(word, wordForTranslate, restText, isNewLine);
  }

  private parseTimestamp(timestamp: string): number {
    if (timestamp) {
      const matchList: string[] = timestamp.match(parseSubtitleTimeRegExp);
      const timeItem = 60;

      if (!matchList) {
        throw new Error('Invalid timestamp format: ' + timestamp);
      }

      const { hours, minutes, seconds } = this.getTimeForSubtitle(matchList);
      const isGetTime: boolean = !!((hours || hours === 0) && (minutes || minutes === 0) && (seconds || seconds === 0));

      return isGetTime ? seconds + timeItem * minutes + timeItem * timeItem * hours : null;
    }

    return null;
  }

  private getTimesMatch(matchList) {
    const emptyStamp = '0';

    const hoursMatch: string = matchList[1] || emptyStamp;
    const minutesMatch: string = matchList[2] || emptyStamp;
    const secondsMatch: string = matchList[3] || emptyStamp;

    return {
      hoursMatch,
      minutesMatch,
      secondsMatch
    };
  }

  private getTimeForSubtitle(matchList) {
    const radix = 10;
    const { hoursMatch, minutesMatch, secondsMatch } = this.getTimesMatch(matchList);

    const hours = parseInt(hoursMatch, radix);
    const minutes = parseInt(minutesMatch, radix);
    const seconds = parseFloat(secondsMatch.replace(Const.COMMA, Const.DOT));

    return {
      hours,
      minutes,
      seconds
    };
  }
}
