import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
  <div class="navbar" >
    <a [routerLink]="['/play']"
      routerLinkActive="router-link-active"><span>Play</span></a>
    <a [routerLink]="['/heroes']"
      routerLinkActive="router-link-active"><span>Heroes</span></a>
    <a [routerLink]="['/heroes-forever']"
      routerLinkActive="router-link-active"><span>Heroes Forever</span></a>
    <a [routerLink]="['/villains']"
      routerLinkActive="router-link-active"><span>Villains</span></a>
    <a [routerLink]="['/wiki']"
      routerLinkActive="router-link-active"><span>Wiki</span></a>
    <a [routerLink]="['/timer-cache']"
      routerLinkActive="router-link-active"><span>Timer Cache</span></a>
    <a href="http://ideablade.com" target="_blank"><span>Ward Bell</span></a>
  </div>
  `
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
