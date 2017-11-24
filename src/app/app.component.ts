import { Component, ViewChild, ElementRef } from '@angular/core';
//https://coursetro.com/posts/code/29/Working-with-Angular-2-Material
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav') sidenav:ElementRef;

  showSidenav = function(){
    this.sidenav.open();
  }
}
