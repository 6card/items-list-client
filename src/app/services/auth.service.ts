import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public token: string;

  constructor(private http: Http) {
  }

  public isAuthenticated() {
    return this.token ? true : false;
  }

  login(username: string, password: string): Observable<boolean> {
    const apiURL = 'http://home.6card.mykeenetic.ru/yii2/server/api/web/auth/login';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(apiURL, JSON.stringify({ Email: username, Password: password }), options)
        .map((response: Response) => {
            let token = response.json()&& response.json().data.token;
            
            if (token) {
                this.token = token;
                return true;
            } else {
                return false;
            }
        });
  }

  logout(): void {
    this.token = null;
  }

}