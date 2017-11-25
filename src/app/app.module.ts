import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from	"@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';

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
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,    
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,

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
