import { Component, OnInit } from '@angular/core';

//import { fadeInAnimation } from '../../animations/index';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],

  // make fade in animation available to this component
  //animations: [fadeInAnimation],  
  // attach the fade in animation to the host (root) element of this component
  //host: { '[@fadeInAnimation]': '' }
})
export class ItemDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
