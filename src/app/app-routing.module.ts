import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FlashcardsComponent} from './flashcards/flashcards.component';
import {VideosComponent} from './videos/videos.component';


const routes: Routes = [
  {path: '', component: FlashcardsComponent},
  {path: 'flashcards', component: FlashcardsComponent},
  {path: 'videos', component: VideosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
