import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output()  sidenavClick: EventEmitter<String> = new EventEmitter<String>();
  constructor(
    public authService:AuthService
  ) { }

  ngOnInit() { }

  showSidenav($event){
    this.sidenavClick.emit(); //emmiting the event.
  }

}
