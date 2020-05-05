import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';

import { GetTextPipe } from './pipes/get-text.pipe';
import { AddFlashcardComponent } from './add-flashcard/add-flashcard.component';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video/video.component';
import { UnsubscribeComponent } from './shared/components/unsubscriber/unsubscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    FlashcardsComponent,
    GetTextPipe,
    AddFlashcardComponent,
    VideosComponent,
    VideoComponent,
    UnsubscribeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  entryComponents: [
    AddFlashcardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
