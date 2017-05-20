import { Component, OnInit } from '@angular/core';

import { Hero, HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  template: `
  <h2>{{title}}</h2>
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
  title = 'Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {

    this.heroService.heroes
      .subscribe(heroes => this.heroes = heroes);

  }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }
}
