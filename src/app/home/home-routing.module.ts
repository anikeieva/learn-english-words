import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlashcardsComponent} from './components/flashcards/flashcards.component';
import {VideosComponent} from './components/videos/videos.component';
import {VideoComponent} from './components/video/video.component';
import {HomeComponent} from './home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', redirectTo: 'flashcards', pathMatch: 'full' },
    { path: 'flashcards', component: FlashcardsComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'videos/:videoId/:seasonId/:episodeId', component: VideoComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
