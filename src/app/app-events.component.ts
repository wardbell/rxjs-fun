import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AppEventBus, AppEvent } from 'app/app-event-bus.service';

@Component({
  selector: 'app-events',
  template: `
    <h3>AppEvents Log</h3>

    <ul *ngIf="(events | async).length; else empty">
      <li><button (click)="clear()">Clear log</button></li>
      <li *ngFor="let event of events | async; let i=index">({{i}}) {{event.type}}: {{event.message}}</li>
    </ul>

    <ng-template #empty>
      <p>The log is empty</p>
    </ng-template>
  `,

  // Only updates when the events array is replaced
  // which it is because `events` array is immutable.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppEventComponent {
  events: Observable<[AppEvent]>;

  constructor(private appEventBus: AppEventBus) {
    this.events = appEventBus.events;
  }

  clear() {
    this.appEventBus.clear();
    // this.appEventBus.add('AppEvents cleared');
  }


  // The `events` Observable does not complete.
  // Should unsubscribe when component destroyed ... but don't have to because
  // 1) async pipe would do that.
  // 2) This component lives as long as the app itself
}
