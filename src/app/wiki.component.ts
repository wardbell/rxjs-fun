import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { WikiService } from './wiki.service';

@Component({
  selector: 'wiki-search',
  template: `
    <h1>Wikipedia Search</h1>
    <p>Search when typing stops</p>

    <input class="search" #term (keyup)="search(term.value)"/>

    <ul *ngIf="!errorMessage">
      <li *ngFor="let article of articles | async">{{article}}</li>
    </ul>

    <p *ngIf="errorMessage" class="error-message">{{errorMessage}}</p>
    `
})
export class WikiComponent implements OnInit {
  articles: Observable<string[]>;
  errorMessage: string;


  private searchTermStream = new Subject<string>();

  search(term: string) {
    this.searchTermStream.next(term);
  }

  constructor (private wikipediaService: WikiService) {}

  ngOnInit() {

    this.articles = this.searchTermStream

      .debounceTime(500)       // wait 1/2 second for typing to stop
      .distinctUntilChanged()  // skip if the current search term is the same as the last on

      // map search term to function that _returns an observable_.
      .switchMap((term: string) => this.wikipediaService.searchStream(term))

      .do(() => this.errorMessage = '') // clear previous error message
      .catch((err: Error) => this.errorMessage = err.message);

  // The `articles` Observable does not complete.
  // We should unsubscribe when component destroyed ... but don't have to
  // because async pipe does that for us
  }
}
