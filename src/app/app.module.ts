import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AngularFireModule} from 'angularfire2';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import{MarkerService} from './services/marker.service';
import{MapService} from './services/map.service';
import{ListServiceService } from './services/list-service.service';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
//----Dialog-----
import { ListServiceDialogComponent } from './list-service-dialog/list-service-dialog.component';


export const config={
  
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ListServiceDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config)
   
  ],
  entryComponents: [ListServiceDialogComponent],
  providers: [MarkerService,MapService,ListServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
