import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  subtitlesTextList = [];
  cueList = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getSubtitleText()
      .subscribe((response: string) => {
        if (response) {
          this.handleSubtitleText(response);
        }
      }, (error) => {
        console.log(error);
      });
  }

  private handleTrackEvents(track) {
    const video = document.querySelector('video');
    const statusDiv = document.querySelector('#currentTrackStatuses');
    const subtitlesCaptionsDiv = document.querySelector('#subtitlesCaptions');
    const tracks = video.querySelectorAll('track');
    console.log(tracks);

    video.addEventListener('loadedmetadata', () => {
      console.log('metadata loaded');

      track.addEventListener('cuechange', (e) => {
        console.log(e);
        const activeCues = e && e.target && e.target.activeCues;
        const activeCue = activeCues[0];

        if (activeCue && activeCue.text) {
          this.subtitlesTextList.forEach((line) => {
            if (line.text === activeCue.text) {
              line.active = true;
              console.log(line);
            } else {
              line.active = false;
            }
          });
        }
        console.log(this.subtitlesTextList);
      });

      // tslint:disable-next-line:prefer-for-of
      // for (let i = 0; i < tracks.length; i++) {
      //   const t = tracks[i].track;
      //   if (t.mode === 'showing') {
      //     console.log('showing');
      //     t.addEventListener('cuechange', (e) => {
      //       console.log(e);
      //     });
      //     // t.addEventListener('logCue', logCue);
      //   }
      // }
      // display in a div the list of tracks and their status/mode value
      // displayTrackStatus();
    });

    // function displayTrackStatus() {
    //   // display the status / mode value of each track.
    //   // In red if disabled, in green if showing
    //   for (let i = 0; i < tracks.length; i++) {
    //     const t = tracks[i].track;
    //     const mode = t.mode;
    //     appendToScrollableDiv(statusDiv, 'track ' + i + ': ' + t.label
    //       + ' ' + t.kind + ' in '
    //       + mode + ' mode');
    //   }
    // }
    // function appendToScrollableDiv(div, text) {
    //   // we've got two scrollable divs. This function
    //   // appends text to the div passed as a parameter
    //   // The div is scrollable (thanks to CSS overflow:auto)
    //   const inner = div.innerHTML;
    //   div.innerHTML = inner + text + '<br/>';
    //   // Make it display the last line appended
    //   div.scrollTop = div.scrollHeight;
    // }
    //
    // function clearDiv(div) {
    //   div.innerHTML = '';
    // }
    //
    // function clearSubtitlesCaptions() {
    //   clearDiv(subtitlesCaptionsDiv);
    // }
    // function toggleTrack(i) {
    //   // toggles the mode of track i, removes the cue listener
    //   // if its mode becomes "disabled"
    //   // adds a cue listener if its mode was "disabled"
    //   // and becomes "hidden"
    //   const t = tracks[i].track;
    //   switch (t.mode) {
    //     case 'disabled':
    //       t.addEventListener('cuechange', logCue, false);
    //       t.mode = 'hidden';
    //       break;
    //     case 'hidden':
    //       t.mode = 'showing';
    //       break;
    //     case 'showing':
    //       t.removeEventListener('cuechange', logCue, false);
    //       t.mode = 'disabled';
    //       break;
    //   }
    //   // updates the status
    //   clearDiv(statusDiv);
    //   displayTrackStatus();
    //   appendToScrollableDiv(statusDiv, '<br>' + t.label + ' are now ' + t.mode);
    // }
    //
    // function logCue(e) {
    //   // callback for the cue event
    //   console.log(e);
    //   if (this.activeCues && this.activeCues.length) {
    //     const t = this.activeCues[0].text; // text of current cue
    //     appendToScrollableDiv(subtitlesCaptionsDiv, 'Active '
    //       + this.kind + ' changed to: ' + t);
    //   }
    // }
  }

  private parseTimestamp(s) {
    const match = s.match(/^(?:([0-9]+):)?([0-5][0-9]):([0-5][0-9](?:[.,][0-9]{0,3})?)/);
    if (match == null) {
      throw new Error('Invalid timestamp format: ' + s);
    }
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseFloat(match[3].replace(',', '.'));
    return seconds + 60 * minutes + 60 * 60 * hours;
  }

  private getSubtitleText(): Observable<string> {
    return this.http.get('http://localhost:4200/assets/videos/Gilmore_Girls_5-09.en.vtt', { responseType: 'text' })
      .pipe(
        catchError((error: Error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  private createSubtitlesTrack() {
    const video = document.querySelector('video');
    const track = video.addTextTrack('subtitles', 'English', 'en');
    track.mode = 'showing';
    Object.keys(this.cueList).map((key: string) => {
      const cue: VTTCue = this.cueList[key];
      track.addCue(cue);
    });
    console.log(track);

    this.handleTrackEvents(track);
  }

  private handleSubtitleText(content) {
    const pattern = /^([0-9]+)$/;
    // tslint:disable-next-line:max-line-length
    const patternTimecode = new RegExp(/^([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)$/);

    const lines = content.split(/\r?\n/);
    let transcript = '';
    let startTime;
    let endTime;
    for (let i = 0; i < lines.length; i++) {
      const identifier = pattern.exec(lines[i]);
      if (identifier) {
        i++;
        const timecode = patternTimecode.exec(lines[i]);

        if (timecode && identifier[0]) {
          startTime = this.parseTimestamp(timecode[1]);
          endTime = this.parseTimestamp(timecode[2]);
        }
        // is the current line a timecode?
        if (timecode && i < lines.length) {
          i++;
          // it can only be a text line now
          let text = lines[i];

          // is the text multiline?
          while (lines[i + 1] !== '' && i < lines.length) {
            text = text + '\n' + lines[i + 1];
            i++;
          }
          let transText = '';
          const voices = getVoices(text);
          if (voices.length > 0) {
            // how many voices ?
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < voices.length; j++) {
              transText += voices[j].voice + ': '
                + removeHTML(voices[j].text)
                + '<br />';
            }
          } else {
            // not a voice text
            transText = removeHTML(text) + '<br />';
          }
          const clearedText: string = text.replace('', '');
          // this.cueList[identifier[0]].text = text;

          this.cueList[identifier[0]] = new VTTCue(
            startTime,
            endTime,
            text
          );

          this.subtitlesTextList.push({ startTime, endTime, text, active: false });
          transcript += transText;
        }
      }
      // const oTrans = document.querySelector('.subtitles-content__text');
      // oTrans.innerHTML = transcript;
    }

    console.log(this.subtitlesTextList);
    console.log(this.cueList);

    this.createSubtitlesTrack();

    function getVoices(speech) {
      const voices = [];
      let pos = speech.indexOf('<v'); // voices are like <v Michel> ....
      while (pos !== -1) {
        const endVoice = speech.indexOf('>');
        const voice = speech.substring(pos + 2, endVoice).trim();
        const endSpeech = speech.indexOf('</v>');
        const text = speech.substring(endVoice + 1, endSpeech);
        voices.push({
          voice,
          text
        });
        speech = speech.substring(endSpeech + 4);
        pos = speech.indexOf('<v');
      }
      return voices;
    }

    function removeHTML(text) {
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    }
  }

}
