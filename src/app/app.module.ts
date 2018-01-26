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
import { ListServiceDialogComponent } from './list-service-dialog/list-service-dialog.component';
import { D3DialogComponent } from './d3-dialog/d3-dialog.component';
import { HomeComponent } from './home/home.component';
import { AllEquipmentsComponent } from './all-equipments/all-equipments.component';

import { AppRoutingModule } from './/app-routing.module';

export const config={
  
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ListServiceDialogComponent,
    D3DialogComponent,
    HomeComponent,
    AllEquipmentsComponent
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
    AppRoutingModule
  ],
  entryComponents: [ListServiceDialogComponent,D3DialogComponent],
  providers: [MarkerService,MapService,ListServiceService,EquipmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
