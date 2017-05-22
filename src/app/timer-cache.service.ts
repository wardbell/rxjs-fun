import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AppEventBus } from 'app/app-event-bus.service';
import { createTimerCache } from './caching-fns';
import { Hero, heroTouch, heroesUrl } from './hero';

@Injectable()
export class TimerCacheService {

  /** Observable cache of heroes */
  heroes: Observable<Hero[]>;

  constructor(http: Http, appEventBus: AppEventBus) {

    const expirationPeriod = 4000; // ms

    // Initial value is optional. This one is for the demo.
    const initialHeroes: Hero[] = [{id: 0, name: 'Hero Zero', count: 0, bio: 'nada'}];

    const source = http.get(heroesUrl)
      .delay(1000) // demo: pretend server is slow
      .map(res => res.json().data as Hero[])
      .do(() => appEventBus.log('TimerCacheService', 'Fetched heroes'))
      .map(heroes => heroTouch(heroes));

    this.heroes = createTimerCache<Hero[]>(source, expirationPeriod, initialHeroes);
  }
}

