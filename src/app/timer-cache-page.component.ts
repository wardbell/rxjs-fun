import { Component } from '@angular/core';

@Component({
  selector: 'timer-cache-page',
  template: `
  <h2>Timer Cache</h2>
  <button (click)="toggle()">{{ showTimerCache ? 'Hide' : 'Show' }} TimerCache</button>
  <timer-cache *ngIf="showTimerCache"></timer-cache>
  `
})
export class TimerCachePageComponent {
 showTimerCache = true;
 toggle() { this.showTimerCache = !this.showTimerCache; }
}
