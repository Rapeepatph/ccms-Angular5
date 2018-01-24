import { NgModule } from '@angular/core';


import{AlertModule} from 'ngx-bootstrap'
@NgModule({
  imports: [
    AlertModule.forRoot()
  ],
  exports:[
    AlertModule
  ],

  declarations: []
})
export class BootstrapModule { }
