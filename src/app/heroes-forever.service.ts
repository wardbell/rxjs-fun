import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';

import { AppEventBus } from 'app/app-event-bus.service';
import { Hero, heroTouch, heroesUrl } from 'app/hero';

@Injectable()
export class HeroesForeverService {

  heroesForever: Observable<Hero[]>;

  constructor(http: Http, appEventBus: AppEventBus) {

    const heroesForever =  http.get(heroesUrl)
      .map(res => res.json().data as Hero[])

      .do(() => appEventBus.log('HeroesForeverService', 'Fetched heroes'))

      .map(heroes => heroTouch(heroes))

      .publishLast(); // share once source completes.

    heroesForever.connect(); // start subscribing immediately.

    this.heroesForever = heroesForever;
  }
}
