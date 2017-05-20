import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>RxJS Timer Cache</h1>
  <p>Look for output in browser console</p>
  <button (click)="toggle()">{{ showTimerCache ? 'Hide' : 'Show' }} TimerCache</button>
  <timer-cache *ngIf="showTimerCache"></timer-cache>
  `
})
export class AppComponent {
 showTimerCache = true;
 toggle() { this.showTimerCache = !this.showTimerCache; }
}

