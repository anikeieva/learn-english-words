import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { GetTextPipe } from '../shared/pipes/get-text.pipe';
import { AddFlashcardComponent } from './components/add-flashcard/add-flashcard.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoComponent } from './components/video/video.component';
import { UnsubscribeComponent } from './components/unsubscriber/unsubscribe.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { SubtitlesComponent } from './components/subtitles/subtitles.component';
import { SeasonsComponent } from './components/seasons/seasons.component';
import { BaseApiService } from '../shared/services/base-api.service';
import { FlashcardsService } from '../shared/services/flashcards.service';
import { VideoService } from '../shared/services/video.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotificationInterceptor } from '../shared/services/notification.interceptor';
import { MatSnackBarModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  declarations: [
    FlashcardComponent,
    FlashcardsComponent,
    GetTextPipe,
    AddFlashcardComponent,
    VideosComponent,
    VideoComponent,
    UnsubscribeComponent,
    SubtitlesComponent,
    SeasonsComponent
  ],
  providers: [
    BaseApiService,
    FlashcardsService,
    VideoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ]
})
export class HomeModule { }
