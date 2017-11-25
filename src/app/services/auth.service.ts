import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public token: string;

  constructor(private http: HttpClient) {
  }

  public isAuthenticated() {
    return this.token ? true : false;
  }

  login(username: string, password: string): Observable<boolean> {
    const apiURL = 'http://home.6card.mykeenetic.ru/yii2/server/api/web/auth/login';
    let headers = new  HttpHeaders ();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return this.http.post(apiURL, { Email: username, Password: password }, { headers: headers })
        .map((response: Response) => {
            let token = response && response['data']['token'];            
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