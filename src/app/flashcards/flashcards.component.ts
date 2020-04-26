import { Component, OnInit } from '@angular/core';

import {flashcards} from '../data/flashcards_info';
import {Flashcard} from '../models/Flashcard';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = flashcards;

  constructor() { }

  ngOnInit() {
  }
}
