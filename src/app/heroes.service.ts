import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';
export { Hero }

@Injectable()
export class HeroesService {

  heroes: Observable<Hero[]>;

  constructor(private http: Http) {

    this.heroes = this.http.get('hero.json')
      .map(res => res.json() as Hero[]);

  }
}
