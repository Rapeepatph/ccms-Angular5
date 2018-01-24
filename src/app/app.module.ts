import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BootstrapModule} from './Modules/bootstrap/bootstrap.module';
import { MaterialModule } from './Modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import{MarkerService} from './services/marker.service';
import{MapService} from './services/map.service';
import{ListServiceService } from './services/list-service.service';
import{EquipmentService} from './services/equipment.service';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
//----Dialog-----
import { ListServiceDialogComponent } from './list-service-dialog/list-service-dialog.component';
// import { AlertModule } from 'ngx-bootstrap';
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
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    BootstrapModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // AlertModule.forRoot()
   
  ],
  entryComponents: [ListServiceDialogComponent],
  providers: [MarkerService,MapService,ListServiceService,EquipmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
