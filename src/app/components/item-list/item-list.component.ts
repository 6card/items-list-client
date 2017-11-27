import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { ItemService } from '../../services/item.service';

import { Item } from '../../shared/item';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public items: Item[];

  constructor(
    public authService: AuthService,
    public itemService: ItemService,
  ) { }

  ngOnInit() {
    this.loadMedias(); 
  }

  loadMedias() {
    this.itemService.getItems(this.authService.token)
      .subscribe(
        data => {
          this.items = data;
          console.log(this.items);
        },
        err => {
          console.error(err);
        }
        /*
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        }
        */
      );
  }

}
