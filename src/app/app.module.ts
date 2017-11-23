import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from	"@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

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
    TabsComponent
  ],
  imports: [
    MatTabsModule,
    BrowserAnimationsModule,

    BrowserModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
