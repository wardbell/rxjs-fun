import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

import { debugLog } from './debug-logger';

@Injectable()
export class WikiService {
  constructor(private jsonp: Jsonp) {}

  search (term: string) {

    let wikiUrl = 'http://en.wikipedia.org/w/api.php';

    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    // TODO: Add error handling
    return this.jsonp
               .get(wikiUrl, { search: params })
               .map(response => <string[]> response.json()[1])
               .do(() => debugLog(`Searched wiki for "${term}"`));
  }
}
