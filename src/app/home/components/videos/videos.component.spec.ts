import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosComponent } from './videos.component';
import { VideoService } from '../../../shared/services/video.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('VideosComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let fixture: ComponentFixture<VideosComponent>;
  let component: VideosComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosComponent ],
      providers: [ VideoService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const url = `http://192.168.88.109:3000/videos`;
    httpTestingController.expectOne(url);
  });
});
