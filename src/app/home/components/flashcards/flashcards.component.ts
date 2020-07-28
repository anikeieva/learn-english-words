import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Flashcard } from '../../../shared/models/Flashcard';
import { FlashcardsService } from '../../../shared/services/flashcards.service';
import { AddFlashcardComponent } from '../add-flashcard/add-flashcard.component';
import { UnsubscribeComponent } from '../unsubscriber/unsubscribe.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent extends UnsubscribeComponent implements OnInit {
  flashCards: Flashcard[];
  subscriptions: Subscription[] = [];

  constructor(
    private flashcardsService: FlashcardsService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.flashcardsService.getFlashcards()
        .subscribe((flashcards: Flashcard[]) => {
          this.flashCards = flashcards;
        })
    );
  }

  addFlashcard() {
    const dialogRef = this.dialog.open(AddFlashcardComponent);

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((flashCard: Flashcard) => {
        if (flashCard) {
          this.flashcardsService.addFlashCard(flashCard)
            .subscribe((flashCardFromRequest: Flashcard) => {
              if (!this.flashCards) {
                this.flashCards = [];
              }

              this.flashCards.push(flashCardFromRequest);
            });
        }
      })
    );
  }
}
