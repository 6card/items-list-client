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
    const headers = new  HttpHeaders({
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    });
    const options = { headers: headers };

    return this.http.post(apiURL, { Email: username, Password: password }, options )
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