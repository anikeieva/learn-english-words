import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Flashcard } from '../models/Flashcard';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  constructor(private http: HttpClient) { }

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>('http://localhost:3000/flashcards')
      .pipe(
        catchError((error: Error) => throwError(error))
      );
  }

  addFlashCard(flashcard: Flashcard): Observable<Flashcard> {
    return this.http.post<Flashcard>('http://localhost:3000/flashcards', flashcard)
      .pipe(
        catchError((error: Error) => throwError(error))
      );
  }
}
