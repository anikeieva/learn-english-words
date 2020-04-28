import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Flashcard } from '../models/Flashcard';
import { FlashcardsService } from '../services/flashcards.service';
import { AddFlashcardComponent } from '../add-flashcard/add-flashcard.component';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {
  flashCards: Flashcard[];

  constructor(
    private flashcardsService: FlashcardsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.flashcardsService.getFlashcards()
      .subscribe((flashcards: Flashcard[]) => {
        this.flashCards = flashcards;
      });
  }

  addFlashcard() {
    const dialogRef = this.dialog.open(AddFlashcardComponent);

    dialogRef.afterClosed().subscribe((flashCard: Flashcard) => {
      this.flashcardsService.addFlashCard(flashCard)
        .subscribe((flashCardFromRequest: Flashcard) => {
          if (!this.flashCards) {
            this.flashCards = [];
          }

          this.flashCards.push(flashCardFromRequest);
        });
    });
  }
}
