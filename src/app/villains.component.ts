import { Component, OnInit } from '@angular/core';

import { Villain } from 'app/villain';
import { VillainsService } from './villains.service';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-villains',
  template: `
    <h2>Villains</h2>

    <ul *ngIf="!errorMessage">
      <li>
        <button (click)="getVillains()">Refresh villains</button>
      </li>
      <li *ngFor="let villain of villains | async">
        {{villain.id}} - {{villain.name}}
      </li>
    </ul>

    <p *ngIf="errorMessage" class="error-message">{{errorMessage}}</p>
  `
})
export class VillainsComponent implements OnInit {
  villains: Observable<Villain[]>;
  errorMessage: string;

  constructor(private villainService: VillainsService) { }

  ngOnInit() {
    this.getVillains();
  }

  getVillains() {

    // No subscription!  Let async pipe subscribe!

    this.villains = this.villainService.villains

      .do(() => this.errorMessage = '')

      .catch((err: Error) => this.errorMessage = err.message);
  }

  // No ngOnInit needed
}
