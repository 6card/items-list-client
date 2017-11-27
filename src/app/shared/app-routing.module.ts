import { NgModule } from '@angular/core';
import { Routes, RouterModule } from	"@angular/router";

import { LoginComponent } from '../components/login/login.component';
import { ItemListComponent } from '../components/item-list/item-list.component';

const	routes:	Routes	=	[
    {path:	'',	redirectTo:	'login',	pathMatch:	'full'},
    /*
    { path:	'media',	component:	MediaListComponent, canActivate: [AuthGuard] },
    { path:	'media/add',	component:	MediaAddComponent, canActivate: [AuthGuard] },
    { path:	'media/:id',	component:	MediaDetailComponent, canActivate: [AuthGuard] },
    //{ path:	'media/stat/:id',	component:	MediaStatComponent, canActivate: [AuthGuard] },
    */
    { path:	'login',	component:	LoginComponent },
    { path:	'item',	component:	ItemListComponent },
    { path:	'**',	redirectTo:	'login', pathMatch:	'full'}
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(routes, {useHash: false}) ],
    exports: [ RouterModule ],
    declarations: []
  })
  export class AppRoutingModule { }