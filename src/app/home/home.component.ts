import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuOptions = [
    {
      name: 'Flashcards',
      path: '/flashcards'
    },
    {
      name: 'Videos',
      path: '/videos'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
