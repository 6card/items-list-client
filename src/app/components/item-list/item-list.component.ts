import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { ItemService } from '../../services/item.service';

import { Item } from '../../shared/item';

import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

import { group,trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

// import fade in animation
import { fadeInAnimation } from '../../animations/index';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  animations: [
    
    trigger('goals', [
      transition('* => *', [

        query(':enter', 
          style({
            height: 0, 
            //transform: 'translateX(50px)', 
            opacity: 0
          }), {optional: true}),

        query(':enter', stagger('100ms', [ //stagger - для каждого по отдельности  + задержка
          group([
            animate('0.3s 0.1s ease', style({
              //transform: 'translateX(0)',
              height: '*'
            })),
            animate('0.3s ease', style({
              opacity: 1
            }))
          ])
        ]), {optional: true}),
        query(':leave', stagger('100ms', [
          group([
            animate('0.3s ease', style({
              //transform: 'translateX(50px)',
              height: 0
            })),
            animate('0.3s 0.2s ease', style({
              opacity: 0
            }))
          ])
        ]), {optional: true})
      ])
    ]),

    fadeInAnimation    
  ],
  
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
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
      .subscribe( result => {
          let data: any = this.respondHandler(result);
          if (data)
            this.items = data;          
          this.notifyChildren();
        },
        err => {
          this.errorHandler(err);
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
      .subscribe((result: any) => {
        let data: any = this.respondHandler(result);
        if (data)
          this.items.push(data);
        this.notifyChildren();        
      },
      error => {        
        this.errorHandler(error);
      });
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.itemService.deleteItem(this.authService.token, id)
      .subscribe(result => {        
        //console.log(result); 
      },
      error => {        
        this.errorHandler(error);
      });
  }

  animationDone(event) {
    //console.log('animation done');
  }

  protected respondHandler(res: any) {
    if (!res.success) {
        console.error(res.data.message);
        return false;
    }        
    return res.data;        
  }

  protected errorHandler(error: any) {
      //this.alertService.error(0, error);
      console.error(error.message);
  }

}
