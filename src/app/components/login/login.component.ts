import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { patternValidator } from '../../shared/pattern-validator';

import { AuthService } from '../../services/auth.service';

//import { fadeInAnimation } from '../../animations/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  // make fade in animation available to this component
  //animations: [fadeInAnimation],  
  // attach the fade in animation to the host (root) element of this component
  //host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {

  error: string = '';
  returnUrl: string;
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      Email: [
        '', 
        Validators.compose([
          Validators.required, 
          patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        ]),
      ],
      Password: ['', Validators.required]
    }, { updateOn: 'blur' });

  }

  ngOnInit() {
    //сброс авторизации
    this.authService.logout();
    //получаем returnUrl
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  

  doLogin(event:any) {
    if(this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.controls['Email'].value, this.loginForm.controls['Password'].value)
        .subscribe(result => {
            let data: any = this.respondHandler(result);
            //console.log(data);
            if (data.status === "success") {
                // login successful
                this.router.navigate([this.returnUrl]);
            } else {
                // login failed
                alert(data.message);
                
            }
            this.loading = false;
        },
        error => {
          this.errorHandler(error)
        });
    }
  }

  protected respondHandler(res: any) {
    //console.log(res);
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
