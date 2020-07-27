import { TestBed } from '@angular/core/testing';

import { FlashcardsService } from './flashcards.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FlashcardsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: FlashcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FlashcardsService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FlashcardsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('FlashcardsService should be created', () => {
    expect(service).toBeTruthy();
  });
});
