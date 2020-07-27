import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoComponent } from './video.component';
import { VideoService } from '../../../shared/services/video.service';
import { FlashcardsService } from '../../../shared/services/flashcards.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../shared/tests/activatedRouteStub';
import { Episode, Season, Video } from '../../../shared/models/video';
import { getTestVideos } from '../../../shared/models/testing/test-video';

describe('VideoComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;
  let activatedRoute: ActivatedRouteStub;
  // let episode: Episode;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ VideoComponent ],
      providers: [
        VideoService,
        FlashcardsService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // const video: Video = getTestVideos()[0];
    // const season: Season = video.seasons[0];
    // episode = season.episodesList[0];

    // fixture.detectChanges();

    // activatedRoute.setParamMap({
    //   videoId: video.id,
    //   seasonId: season.id,
    //   episodeId: episode.id
    // });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get correct video', async(() => {
  //   fixture.whenStable().then(() => {
  //     expect(component.video.videoSrc).toBe(episode.videoSrc);
  //   });
  // }));
});
