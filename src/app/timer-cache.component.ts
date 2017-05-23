import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
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

  heroCache: Observable<Hero[]>;

  private onDestroy = new Subject();
  private subscriptionA: Subscription;

  constructor(timerCacheService: TimerCacheService) {
    this.heroCache = timerCacheService.heroes;
  }

  ngOnInit() {
    // Add subscribers
    debugLog('*** TimerCacheComponent created; start subscribing ***');

    /// subscription approach ///

    this.subscriptionA = this.heroCache
      .subscribe(this.makeSubscriber('A'));

    /// takeUntil approach ///

    this.heroCache
      .takeUntil(this.onDestroy)
      .subscribe(this.makeSubscriber('B'));

    this.heroCache
      .takeUntil(this.onDestroy)
      .subscribe(this.makeSubscriber('C'));
  }

  makeSubscriber(name: string) {
    return {
      next:     hero => debugLog(`Subscriber ${name}: got heroes`, hero),
      error:    err => debugLog(`Subscriber ${name} error`, err),
      complete: () => debugLog(`Subscriber ${name} completed`)
    };
  }

  ngOnDestroy() {
    this.subscriptionA.unsubscribe();
    this.onDestroy.next();
  }
}
