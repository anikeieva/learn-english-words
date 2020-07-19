import { TestBed } from '@angular/core/testing';

import { FlashcardsService } from './flashcards.service';

describe('FlashcardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashcardsService = TestBed.get(FlashcardsService);
    expect(service).toBeTruthy();
  });
});
