import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroesForeverService } from 'app/heroes-forever.service';

@Component({
  selector: 'app-heroes',
  template: `
  <h2>Heroes Forever</h2>

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
export class HeroesForeverComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroForeverService: HeroesForeverService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {

    // This time we get heroes from the CACHED observable
    this.heroForeverService.heroesForever

      // Proves heroesForever completes so no need to unsubscribe.
      // .do(null, null, () => console.log('heroes forever completed'))

      .subscribe(heroes => this.heroes = heroes);

  }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }
}
