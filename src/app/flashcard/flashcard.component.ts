import {Component, Input, OnInit} from '@angular/core';

import {Flashcard} from '../models/Flashcard';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
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
}
