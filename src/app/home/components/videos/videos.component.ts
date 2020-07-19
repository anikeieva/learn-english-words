import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { VideoService } from '../../../shared/services/video.service';
import { Video } from '../../../shared/models/video';
import { UnsubscribeComponent } from '../../../shared/components/unsubscriber/unsubscribe.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent extends UnsubscribeComponent implements OnInit {
  subscriptions = [];
  videos: Video[];

  constructor(
    private videoService: VideoService
  ) {
    super();
  }

  ngOnInit() {
    const getVideoSubscription: Subscription = this.videoService.getVideos()
      .subscribe((videos: Video[]) => {
        if (videos) {
          this.videos = videos;
        }
      });

    this.subscriptions.push(getVideoSubscription);
  }
}
