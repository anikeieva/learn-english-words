import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Video } from '../models/video';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends BaseApiService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getVideos(): Observable<Video[]> {
    return this.get('videos');
  }

  getVideo(id: string = '1'): Observable<Video> {
      return this.get('videos', {
        params: new HttpParams().set('id', id.toString())
      }).pipe(
        map((videos: Video[]) => videos[0] ? videos[0] : null)
      );
  }

  getSubtitleText(url: string = ''): Observable<string> {
    return this.getClient(url, { responseType: 'text' });
  }
}
