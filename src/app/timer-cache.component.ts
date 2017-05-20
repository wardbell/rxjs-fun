import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { Hero } from './hero';
import { log } from './caching-fns';
import { TimerCacheService } from './timer-cache.service';

@Component({
  selector: 'timer-cache',
  template: `
  <h1>TimerCache Heroes</h1>
  <div *ngFor="let hero of heroCache | async">
    {{hero.name}} {{hero.count}}
  </div>
  `
})
export class TimerCacheComponent implements OnInit, OnDestroy {

  private onDestroy = new Subject();

  heroCache: Observable<Hero[]>;

  constructor(timerCacheService: TimerCacheService) {
    this.heroCache = timerCacheService.cache;
  }

  ngOnInit() {

    log('*** Start subscribing ***');

    // Try it with two additional Subscribers

    this.heroCache.takeUntil(this.onDestroy).subscribe(
      h => log('Subscriber A: got heroes', h),
      err => log('Subscriber A error', err),
      () => log('Subscriber A completed')
    );

    this.heroCache.takeUntil(this.onDestroy).subscribe(
      h => log('Subscriber B: got heroes', h),
      err => log('Subscriber B error', err),
      () => log('Subscriber B completed')
    );
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
