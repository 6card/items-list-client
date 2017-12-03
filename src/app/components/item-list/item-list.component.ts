import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { ItemService } from '../../services/item.service';

import { Item } from '../../shared/item';

import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

import { group,trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  animations: [
    
    trigger('goals', [
      transition('* => *', [

        query(':enter', style({height: 0, transform: 'translateX(50px)', opacity: 0}), {optional: true}),

        query(':enter', stagger('100ms', [ //stagger - для каждого по отдельности  + задержка
          group([
            animate('0.3s 0.1s ease', style({
              transform: 'translateX(0)',
              height: 48
            })),
            animate('0.3s ease', style({
              opacity: 1
            }))
          ])
        ]), {optional: true}),
        query(':leave', stagger('100ms', [
          group([
            animate('0.3s ease', style({
              transform: 'translateX(50px)',
              height: 0
            })),
            animate('0.3s 0.2s ease', style({
              opacity: 0
            }))
          ])
        ]), {optional: true})
      ])
    ])
    
  ]
})
export class ItemListComponent implements OnInit {

  parentSubject:Subject<any> = new Subject();

  public items: Item[] = [];
  public loadingState: boolean = false;

  constructor(
    public authService: AuthService,
    public itemService: ItemService,
  ) { }

  ngOnInit() {
    this.loadItems(); 
  }

  notifyChildren() {
    this.parentSubject.next(false);
  }

  loadItems() {
    this.itemService.getItems(this.authService.token)
      .subscribe(
        data => {
          this.items = data;
          //console.log(this.items);
          this.notifyChildren();
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

  formUpdated(params: any) {
    const obj: any = {
      'name': params.name,
      'is_done' : params.is_done
    }
    this.createItem(obj);
  }

  createItem(obj: Array<any>) {
    
    this.itemService.addItem(this.authService.token, obj['name'], obj['is_done'])
      .subscribe((result: Item) => {
        this.items.push(result);
        this.notifyChildren();
        //console.log(this.items.length);
          /*
          if (result === true) {
              // login successful
              alert('DDDD');
          } else {
              // login failed
              alert('Неправильный логин или пароль');
              
          }
          */
        //this.loadItems();  
        
        
      },
      error => {        
        console.error(error);
      });
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.itemService.deleteItem(this.authService.token, id)
      .subscribe(result => {        
        //console.log(result); 
      },
      error => {        
        console.error(error);
      });
  }

  animationDone(event) {
    //console.log('animation done');
  }

}
