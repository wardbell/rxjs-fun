import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';

import { createTimerCache } from './caching-fns';
import { Hero } from './hero';

let count = 1;

@Injectable()

export class TimerCacheService {

  cache: Observable<Hero[]>;

  constructor(private http: Http) {

    this.cache = this.http.get('hero.json')
      .map(res => res.json() as Hero[])
      .map(heroes => heroes.map(h => {
        h.count = count++;
        return h;
      }))
      .let(createTimerCache());
  }
}
