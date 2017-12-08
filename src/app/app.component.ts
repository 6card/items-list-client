import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//https://coursetro.com/posts/code/29/Working-with-Angular-2-Material

import { routerTransition, fadeInAnimation } from './animations/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition, fadeInAnimation]
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav') sidenav:ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  showSidenav = function($event){
    this.sidenav.open();
  }

  getState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
