import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Villain } from './villain';
export { Villain }

@Injectable()
export class VillainsService {

  villains: Observable<Villain[]>;

  constructor(private http: Http) {

  this.villains = this.http.get('villain.json')
    .map(res => res.json() as Villain[])

    .catch(err => {
      console.log('Oh NO!  This is terrible. Better figure it out. Could be tough', err);

      // Throw a helpful message for the service consumer
      throw new Error('Failed to get villains from the server. Have a nice day :-)');
    });

  }
}
