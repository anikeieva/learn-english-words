import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Flashcard } from '../models/Flashcard';
import { FlashcardsService } from '../services/flashcards.service';
import { AddFlashcardComponent } from '../add-flashcard/add-flashcard.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {
  flashcards: Flashcard[];

  constructor(
    private flashcardsService: FlashcardsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.flashcardsService.getFlashcards()
      .subscribe((flashcards: Flashcard[]) => {
        console.log(flashcards);
        this.flashcards = flashcards;
      });
  }

  addFlashcard() {
    const dialogRef = this.dialog.open(AddFlashcardComponent);

    dialogRef.afterClosed().subscribe((flashcard: FormGroup) => {
      console.log('The dialog was closed', flashcard);
    });
  }
}
