import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <div class="container">
    <main class="text-center">
      <img src="./assets/404-not-found.png" width="900" height="598" alt="404 Not Found">
    </main>
  </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
