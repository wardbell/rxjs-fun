import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';

import { debugLog } from './debug-logger';
import { Hero } from './hero';
export { Hero }

@Injectable()
export class HeroesService {

  heroes: Observable<Hero[]>;
  heroesForever: Observable<Hero[]>;

  constructor(private http: Http) {

    this.heroes = this.http.get('heroes.json')
      .do(() => debugLog('Fetched by heroes'))
      .map(res => res.json() as Hero[])
      .map(heroes => heroTouch(heroes));


    const heroesForever = this.heroesForever = this.heroes.publishLast();
    heroesForever.connect(); // start subscribing.

  }
}

let count = 0;

/** Update each hero's count as it arrives, so distinguish freshly fetched heroes */
export function heroTouch(heroes: Hero[]) {
  return heroes.map(h => { h.count = count++; return h; });
}
