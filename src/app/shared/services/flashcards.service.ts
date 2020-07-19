import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Flashcard } from '../models/Flashcard';
import {BaseApiService} from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService extends BaseApiService {
  constructor(public http: HttpClient) {
    super(http);
  }

  getFlashcards(): Observable<Flashcard[]> {
    return this.get('flashcards');
  }

  addFlashCard(flashcard: Flashcard): Observable<Flashcard> {
    return this.post('flashcards', flashcard);
  }

  getTranslate(word: string): Observable<any> {
    return this.get('https://translate.google.com/?hl=uk#view=home&op=translate&sl=en&tl=uk&text=horrified');
  }
}
