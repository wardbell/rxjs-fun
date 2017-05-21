import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AppEventBus } from 'app/app-event-bus.service';
import { createTimerCache } from './caching-fns';
import { Hero, heroTouch } from './hero';

@Injectable()
export class TimerCacheService {

  /** Observable cache of heroes */
  heroes: Observable<Hero[]>;

  constructor(http: Http, appEventBus: AppEventBus) {

    const expirationPeriod = 4000; // ms

    // Initial value is optional. This one is for the demo.
    const initialHeroes: Hero[] = [{name: 'Hero Zero', count: 0}];

    const source = http.get('heroes.json')
      .delay(1000) // demo: pretend server is slow
      .map(res => res.json() as Hero[])
      .do(() => appEventBus.log('TimerCacheService', 'Fetched heroes'))
      .map(heroes => heroTouch(heroes));

    this.heroes = createTimerCache<Hero[]>(source, expirationPeriod, initialHeroes);
  }
}

