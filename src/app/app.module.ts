import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AngularFireModule} from 'angularfire2';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import{MarkerService} from './services/marker.service';
import{MapService} from './services/map.service';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';


export const config={
  apiKey: "AIzaSyAib9p1x6EjoZI5j5F2yFJyoocWIhE_u_c",
    authDomain: "ccms-186600.firebaseapp.com",
    databaseURL: "https://ccms-186600.firebaseio.com",
    projectId: "ccms-186600",
    storageBucket: "",
    messagingSenderId: "153735653178"
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config)
   
  ],
  providers: [MarkerService,MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
