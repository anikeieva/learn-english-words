import { TestBed } from '@angular/core/testing';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BaseApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: BaseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ BaseApiService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BaseApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('BaseApiService should be created', () => {
    expect(service).toBeTruthy();
  });
});
