import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Item } from '../shared/item';

//import 'rxjs/add/operator/retry';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems(token: string) {
    const apiURL = 'http://home.6card.mykeenetic.ru/yii2/server/api/web/items';
    const params = new HttpParams()
      .set('token', token);
    const options = { params: params };    

    return this.http.get<Item[]>(apiURL, options ); //.retry(3)
  }

  addItem(token: string, name: string, is_done?: number) {
    const apiURL = 'http://home.6card.mykeenetic.ru/yii2/server/api/web/items';

    const params = new HttpParams()
      .set('token', token);

    const headers = new  HttpHeaders()
      .set('Content-Type', 'application/json') 
      .set('Accept', 'application/json');

    const options = { headers: headers, params: params };    

    return this.http.post(apiURL, { name: name, is_done: is_done || 0 }, options ); //.retry(3)
  }
 
}
