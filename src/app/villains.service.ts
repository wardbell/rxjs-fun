import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AppEventBus } from 'app/app-event-bus.service';
import { Villain } from './villain';

@Injectable()
export class VillainsService {

  villains: Observable<Villain[]>;

  constructor(http: Http, appEventBus: AppEventBus) {

  this.villains = http.get('villains.json')
    .map(res => res.json() as Villain[])

    .do(() => appEventBus.log('VillainsService', 'Fetched villains'))

    .catch(err => {
      appEventBus.log('VillainsService error',
        'Oh NO!  This is terrible. Better figure it out. Could be tough', err);

      // Throw a helpful message for the service consumer
      throw new Error('Failed to get villains from the server. Have a nice day :-)');
    });

  }
}
