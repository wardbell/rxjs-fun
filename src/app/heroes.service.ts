import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AppEventBus } from 'app/app-event-bus.service';
import { Hero, heroTouch, heroesUrl } from './hero';

@Injectable()
export class HeroesService {

  heroes: Observable<Hero[]>;

  constructor(http: Http, appEventBus: AppEventBus) {

    this.heroes = http.get(heroesUrl)
      .map(res => res.json().data as Hero[])

      .do(() => appEventBus.log('HeroesService', 'Fetched heroes'))

      .map(heroes => heroTouch(heroes));
  }
}

