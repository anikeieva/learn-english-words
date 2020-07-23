import { Component, Input, OnInit } from '@angular/core';
import { SubtitleWord, WordList } from '../../../shared/models/subtitleWord';
import { Const } from '../../../shared/data/const';
import { AddFlashcardComponent } from '../add-flashcard/add-flashcard.component';
import { Flashcard } from '../../../shared/models/Flashcard';
import { MatDialog } from '@angular/material';
import { FlashcardsService } from '../../../shared/services/flashcards.service';
import { UnsubscribeComponent } from '../../../shared/components/unsubscriber/unsubscribe.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subtitles',
  templateUrl: './subtitles.component.html',
  styleUrls: ['./subtitles.component.scss']
})
export class SubtitlesComponent extends UnsubscribeComponent implements OnInit {
  subscriptions: Subscription[] = [];

  @Input() subtitlesList: SubtitleWord[];
  @Input() isFirstSubtitles: boolean;

  constructor(
    public dialog: MatDialog,
    private flashcardsService: FlashcardsService
  ) {
    super();
  }

  ngOnInit() {
  }

  addFlashcard(word: WordList, line: SubtitleWord) {
    if (this.isFirstSubtitles) {
      const clearWord = word.wordForTranslate.replace(Const.DOT, Const.EMPTY_STRING);
      const imageSrc = this.getImage();

      // this.getTranslate(word.wordForTranslate);

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
  }

  getImage() {
    const video: CanvasImageSource = document.querySelector('video');
    const canvas = document.createElement('canvas');

    canvas.getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();
  }

}
