import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaygroundComponent } from './playground.component';
import { HeroesComponent } from './heroes.component';
import { HeroesForeverComponent } from 'app/heroes-forever.component';
import { TimerCachePageComponent } from './timer-cache-page.component';
import { VillainsComponent } from './villains.component';
import { WikiComponent } from 'app/wiki.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'play', },
  { path: 'play', component: PlaygroundComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes-forever', component: HeroesForeverComponent },
  { path: 'timer-cache', component: TimerCachePageComponent },
  { path: 'villains', component: VillainsComponent },
  { path: 'wiki', component: WikiComponent },
  { path: '**', redirectTo: 'play'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
