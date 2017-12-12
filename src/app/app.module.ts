import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './shared/app-routing.module';
import { MaterialModule } from './shared/material.module';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { ItemService } from './services/item.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabsComponent,
    NavigationComponent,
    SidenavComponent,
    ItemDetailComponent,
    ItemListComponent,
    ItemFormComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule    
  ],
  providers: [
    AuthService,
    AuthGuard,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
