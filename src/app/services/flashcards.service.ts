import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Flashcard} from '../models/Flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  constructor(private http: HttpClient) { }

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>('http://localhost:3000/flashcards');
  }

  addFlashCard(flashcard: Flashcard) {
    this.http.post<Flashcard>('http://localhost:3000/flashcards', flashcard);
  }
}
