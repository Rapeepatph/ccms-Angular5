import { NgModule } from '@angular/core';


import {

  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule
  
  } from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule
  ],
  exports: [

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule
    
    ]
})
export class MaterialModule { }
