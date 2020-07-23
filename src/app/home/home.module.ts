import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { GetTextPipe } from '../shared/pipes/get-text.pipe';
import { AddFlashcardComponent } from './components/add-flashcard/add-flashcard.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoComponent } from './components/video/video.component';
import { UnsubscribeComponent } from '../shared/components/unsubscriber/unsubscribe.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { SubtitlesComponent } from './components/subtitles/subtitles.component';


@NgModule({
  declarations: [
    FlashcardComponent,
    FlashcardsComponent,
    GetTextPipe,
    AddFlashcardComponent,
    VideosComponent,
    VideoComponent,
    UnsubscribeComponent,
    SubtitlesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    SharedModule
  ]
})
export class HomeModule { }
