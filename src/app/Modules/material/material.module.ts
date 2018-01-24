import { NgModule } from '@angular/core';


import {

  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatIconRegistry ,
  MatCardModule,
  MatSidenavModule,
  MatDialogModule,
  MatListModule,
  MatGridListModule
  
  } from '@angular/material';

  import {MatFormFieldModule} from '@angular/material/form-field';
  import {MatSelectModule} from '@angular/material/select';
  import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
    ],
    providers:[MatIconRegistry]
})
export class MaterialModule { 
  constructor(
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
