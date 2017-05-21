import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';

import { AppEventBus } from 'app/app-event-bus.service';
import { createRetryWhenNotifier, RetryWhenNotifier } from 'app/retry-when-notifier';

const svcName = 'WikiService';
const svcErrName = 'WikiService error';

@Injectable()
export class WikiService {

  private readonly wikiUrl = 'http://en.wikipedia.org/w/api.php';
  private retryNotifier: RetryWhenNotifier;

  constructor(private jsonp: Jsonp, private appEventBus: AppEventBus) {
    this.retryNotifier = createRetryWhenNotifier(appEventBus, svcName, this.wikiUrl);
  }

  search (term: string) {

    // Wikipedia's JSONP API
    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
      .get(this.wikiUrl, { search: params })
      .map(response =>  <string[]> response.json()[1])

      // Retry before failing
      .retryWhen(this.retryNotifier)

      // Catch the error that gets by retryWhen
      .catch(err => {
        this.appEventBus.log(svcErrName, 'Fetch failed', err);
        throw new Error('Failed to reach wikipedia. Please try again later.');
      })

      .do(() => this.appEventBus.log(svcName, `Searched wiki for "${term}"`));
  }
}
