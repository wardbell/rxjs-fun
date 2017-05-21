import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppEventBus } from './app-event-bus.service';
import { AppEventComponent } from 'app/app-events.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaygroundComponent } from 'app/playground.component';
import { HeroesComponent } from 'app/heroes.component';
import { HeroesForeverComponent } from 'app/heroes-forever.component';
import { HeroesService } from 'app/heroes.service';
import { HeroesForeverService } from 'app/heroes-forever.service';
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
    AppEventComponent,
    PlaygroundComponent,
    HeroesComponent, HeroesForeverComponent,
    NavComponent,
    TimerCacheComponent, TimerCachePageComponent,
    VillainsComponent,
    WikiComponent,
  ],

  providers: [
    AppEventBus,
    HeroesService, HeroesForeverService,
    TimerCacheService,
    VillainsService,
    WikiService,
  ],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
