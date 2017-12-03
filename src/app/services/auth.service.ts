import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public token: string = 'lJTQa16MQ7NBjanPk3TC5c50Qr4-I0tE';

  constructor(private http: HttpClient) {
  }

  public isAuthenticated() {
    return this.token ? true : false;
  }

  login(username: string, password: string): Observable<boolean> {
    const apiURL = 'http://home.6card.mykeenetic.ru/yii2/api/auth/login';
    const headers = new  HttpHeaders()
      .set('Content-Type', 'application/json') 
      .set('Accept', 'application/json');
    const options = { headers: headers };


    let response = this.http.post(apiURL, { Email: username, Password: password }, options );
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