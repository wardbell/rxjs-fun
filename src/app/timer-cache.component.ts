import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { debugLog } from './debug-logger';
import { Hero } from './hero';
import { TimerCacheService } from './timer-cache.service';

@Component({
  selector: 'timer-cache',
  template: `
  <h2>TimerCache Heroes</h2>
  <div *ngFor="let hero of heroCache | async">
    {{hero.name}} {{hero.count}}
  </div>
  `
})
export class TimerCacheComponent implements OnInit, OnDestroy {

  private onDestroy = new Subject();

  heroCache: Observable<Hero[]>;

  constructor(timerCacheService: TimerCacheService) {
    this.heroCache = timerCacheService.heroes;
  }

  ngOnInit() {
    // Try it with two additional Subscribers
    debugLog('*** TimerCacheComponent created; start subscribing ***');

    this.heroCache.takeUntil(this.onDestroy).subscribe(
      h => debugLog('Subscriber A: got heroes', h),
      err => debugLog('Subscriber A error', err),
      () => debugLog('Subscriber A completed')
    );

    this.heroCache.takeUntil(this.onDestroy).subscribe(
      h => debugLog('Subscriber B: got heroes', h),
      err => debugLog('Subscriber B error', err),
      () => debugLog('Subscriber B completed')
    );
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
