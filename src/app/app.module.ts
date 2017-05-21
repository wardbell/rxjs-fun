import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from 'app/dashboard.component';
import { HeroesComponent } from 'app/heroes.component';
import { HeroesForeverComponent } from 'app/heroesForever.component';
import { HeroesService } from 'app/heroes.service';
import { NavComponent } from './nav.component';
import { TimerCacheComponent } from './timer-cache.component';
import { TimerCachePageComponent } from './timer-cache-page.component';
import { TimerCacheService } from './timer-cache.service';
import { VillainsComponent } from 'app/villains.component';
import { VillainsService } from 'app/villains.service';
import { WikiComponent } from 'app/wiki.component';
import { WikiService } from 'app/wiki.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent, HeroesForeverComponent,
    NavComponent,
    TimerCacheComponent, TimerCachePageComponent,
    VillainsComponent,
    WikiComponent,
  ],

  providers: [
    HeroesService,
    TimerCacheService,
    VillainsService,
    WikiService,
  ],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
