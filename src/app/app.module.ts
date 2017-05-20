import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from 'app/dashboard.component';
import { HeroesComponent } from 'app/heroes.component';
import { HeroesService } from 'app/heroes.service';
import { NavComponent } from './nav.component';
import { TimerCacheComponent } from './timer-cache.component';
import { TimerCacheService } from './timer-cache.service';
import { VillainsComponent } from 'app/villains.component';
import { VillainsService } from 'app/villains.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    NavComponent,
    TimerCacheComponent,
    VillainsComponent,
  ],

  providers: [
    HeroesService,
    TimerCacheService,
    VillainsService,
  ],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
