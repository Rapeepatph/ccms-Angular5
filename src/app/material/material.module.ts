import { NgModule } from '@angular/core';


import {

  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatDialogModule
  
  } from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule
  ],
  exports: [

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule
    ]
})
export class MaterialModule { }
