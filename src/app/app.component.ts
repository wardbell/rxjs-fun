import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <app-nav></app-nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  </div>
  <hr>
  <app-events></app-events>
  `
})
export class AppComponent {
}
