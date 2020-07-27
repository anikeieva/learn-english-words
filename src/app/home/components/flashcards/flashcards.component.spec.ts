import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsComponent } from './flashcards.component';
import { FlashcardsService } from '../../../shared/services/flashcards.service';
import { MatDialogModule } from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('FlashcardsComponent', () => {
  let fixture: ComponentFixture<FlashcardsComponent>;
  let component: FlashcardsComponent;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsComponent ],
      providers: [ FlashcardsService ],
      imports: [ MatDialogModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(FlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const url = `http://192.168.88.109:3000/flashcards`;
    httpTestingController.expectOne(url);
  });
});
