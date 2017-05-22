import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

//////////// Observable Imports ////////////////////////

// Convenient ... but we don't do it this way.
// import { Observable } from 'rxjs';

// Get each thing you need separately
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';


//////// Playground Component /////

@Component({
  selector: 'app-dashboard',
  templateUrl: './playground.component.html'
})
export class PlaygroundComponent implements OnInit {
  //////// Demo 1 ///////////

  demo1() {
    this.currentDemo = 'Demo #1';

    /////// Observable
    const observable = new Observable(

      // A function that takes an Observer
      (observer: Observer<string>) => {

        /**
         * Whatever we're observing should call the observer
         *
         * Let's just bake the actions in
         */

        // Synchronous
        observer.next('Hello, good looking!');

      }
    );

    ////// Subscriber
    const subscriber: Observer<string> = {

      next: value =>
        this.items.push(value),

      error: (err: string) =>
        this.errorMessage = err,

      complete: () =>
        this.items.push('observable completed')

    };

    ////// Subscribe to execute
    // Nothing happens until we subscribe!
    observable.subscribe(subscriber);

  }

  //////// Demo 2 ///////////

  demo2() {
    this.currentDemo = 'Demo #2';

    /////// Observable
    const observable = new Observable(

      // A function that takes an Observer
      (observer: Observer<string>) => {

        /**
         * Whatever we're observing should call the observer
         *
         * Let's just bake the actions in
         */

        // Synchronous
        observer.next('my');
        observer.next('dog');
        observer.next('has');

        // observer.error('oh no!');

        // Async - wait 2 seconds
        setTimeout(() => {
          observer.next('fleas');
          observer.complete();
        }, 2000);
      }
    );

    ////// Subscriber
    const subscriber: Observer<string> = {

      next: value =>
        this.items.push(value),

      error: (err: string) =>
        this.errorMessage = err,

      complete: () =>
        this.items.push('observable completed')

    };

    ////// Subscribe to execute
    // Nothing happens until we subscribe!
    observable.subscribe(subscriber);

  }

  //////// Demo 3 ///////////

  demo3() {
    this.currentDemo = 'Demo #3';
    this.items = [];

    const observable = Observable.fromEvent(this.inputEl, 'keyup');

    ////// Operators: remember to import them!
    // .filter((k: KeyboardEvent) => k.key === 'Enter');


    const observer = {

      // To emit normally
      next: (k: KeyboardEvent) => {
        this.items.push(this.inputEl.value);
      },

      // To throw an error
      error: (err: Error) => this.errorMessage = err.message,

      // To end (complete) the sequence
      complete: () => this.items.push('observable completed')
    };

    //// Nothing happens until we subscribe!
    // Returns a subscription with teardown logic
    const subscription = observable.subscribe(observer);

  }


  ///////////////////

  // tslint:disable:member-ordering

  @ViewChild('input')
  inputElRef: ElementRef;
  private inputEl: HTMLInputElement;

  @ViewChild('nginput')
  ngInputElRef: ElementRef;
  private ngInputEl: HTMLInputElement;

  currentDemo = '';
  errorMessage: string;
  items: any[] = [];
  ngItems: any[] = [];


  react(value: string) {
    this.ngItems.push(value);
  }

  ngOnInit() {
    this.inputEl = this.inputElRef.nativeElement;
    this.ngInputEl = this.ngInputElRef.nativeElement;
  }

  clear() {
    this.inputEl.value = '';
    this.ngInputEl.value = '';
    this.errorMessage = '';
    this.items.length = 0;
    this.ngItems.length = 0;
  }
}
