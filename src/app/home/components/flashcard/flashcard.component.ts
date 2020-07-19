import { Component, Input, OnInit } from '@angular/core';

import { Flashcard } from '../../../shared/models/Flashcard';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  isCardFlipped = false;
  showMoreOpened = false;

  @Input() flashcard: Flashcard;

  constructor() { }

  ngOnInit() {
  }

  onShowMore() {
    this.showMoreOpened = true;
  }

  onHide() {
    this.showMoreOpened = false;
  }

  onFlip() {
    this.isCardFlipped = !this.isCardFlipped;
  }
}
