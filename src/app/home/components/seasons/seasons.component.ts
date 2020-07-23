import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Season, Video } from '../../../shared/models/video';
import { VideoService } from '../../../shared/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeComponent } from '../../../shared/components/unsubscriber/unsubscribe.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent extends UnsubscribeComponent implements OnInit {
  video: Video;
  subscriptions: Subscription[] = [];
  private videoId: string;
  private isVideoGet = false;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.pipe(
        switchMap((params) => {
          if (params && params.get('videoId')) {
            this.videoId = params.get('videoId');

            return this.videoService.getVideo(this.videoId);
          }
        })
      ).subscribe((video: Video) => {
        this.video = video;
        this.isVideoGet = true;
      })
    );
  }

  showEpisodes(season: Season) {
    season.showEpisodes = !season.showEpisodes;
  }

}
