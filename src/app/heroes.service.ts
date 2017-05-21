import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AppEventBus } from 'app/app-event-bus.service';
import { Hero, heroTouch } from './hero';

@Injectable()
export class HeroesService {

  heroes: Observable<Hero[]>;

  constructor(http: Http, appEventBus: AppEventBus) {

    this.heroes = http.get('heroes.json')
      .map(res => res.json() as Hero[])

      .do(() => appEventBus.log('HeroesService', 'Fetched heroes'))

      .map(heroes => heroTouch(heroes));
  }
}

