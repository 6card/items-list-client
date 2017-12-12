import { ChangeDetectorRef, Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
//https://coursetro.com/posts/code/29/Working-with-Angular-2-Material

//import { routerTransition, fadeInAnimation } from './animations/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //animations: [routerTransition, fadeInAnimation]
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav') sidenav:ElementRef;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  options = {
    top: 64, //56
  }



  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  showSidenav = function($event){
    this.sidenav.toggle();
  }

  getState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
