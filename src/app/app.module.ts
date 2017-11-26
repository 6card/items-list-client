import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from	"@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { TabsComponent } from './components/tabs/tabs.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { AuthService } from './services/auth.service';

const	routes:	Routes	=	[
  {path:	'',	redirectTo:	'login',	pathMatch:	'full'},
  /*
  { path:	'media',	component:	MediaListComponent, canActivate: [AuthGuard] },
  { path:	'media/add',	component:	MediaAddComponent, canActivate: [AuthGuard] },
  { path:	'media/:id',	component:	MediaDetailComponent, canActivate: [AuthGuard] },
  //{ path:	'media/stat/:id',	component:	MediaStatComponent, canActivate: [AuthGuard] },
  */
  { path:	'login',	component:	LoginComponent },
  { path:	'**',	redirectTo:	'media',	pathMatch:	'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabsComponent,
    NavigationComponent,
    SidenavComponent
  ],
  imports: [
    MaterialModule,
    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
