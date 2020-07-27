import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitlesComponent } from './subtitles.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FlashcardsService} from '../../../shared/services/flashcards.service';

describe('SubtitlesComponent', () => {
  let component: SubtitlesComponent;
  let fixture: ComponentFixture<SubtitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitlesComponent ],
      providers: [ FlashcardsService ],
      imports: [ MatDialogModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
