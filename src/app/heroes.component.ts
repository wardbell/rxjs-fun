import { Component, OnInit } from '@angular/core';

import { Hero } from 'app/hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  template: `
  <h2>Heroes</h2>

  <ul>
    <li>
      <button (click)="getHeroes()">Refresh heroes</button>
    </li>
    <li *ngFor="let hero of heroes"
      [class.selected]="hero===selectedHero"
      (click)="selectHero(hero)">
        {{hero.name}} {{hero.count}}
    </li>
  </ul>
  `
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {

    this.heroService.heroes

      // .do(null, null, () => console.log('heroes completed'))

      .subscribe(heroes => this.heroes = heroes);

  }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }
}
