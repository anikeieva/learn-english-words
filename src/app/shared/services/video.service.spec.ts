import { TestBed } from '@angular/core/testing';
import { VideoService } from './video.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('VideoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: VideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ VideoService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VideoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('VideoService should be created', () => {
    expect(service).toBeTruthy();
  });
});
