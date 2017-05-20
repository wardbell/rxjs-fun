import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
  <div class="navbar" >
    <a [routerLink]="['/dashboard']"
      routerLinkActive="router-link-active"><span>Dashboard</span></a>
    <a [routerLink]="['/heroes']"
      routerLinkActive="router-link-active"><span>Heroes</span></a>
    <a [routerLink]="['/villains']"
      routerLinkActive="router-link-active"><span>Villains</span></a>
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
