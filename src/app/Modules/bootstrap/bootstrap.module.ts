import { NgModule } from '@angular/core';


import{AlertModule,
  CollapseModule 
} from 'ngx-bootstrap'
@NgModule({
  imports: [
    AlertModule.forRoot(),
    CollapseModule .forRoot()
  ],
  exports:[
    AlertModule,
    CollapseModule 
  ],

  declarations: []
})
export class BootstrapModule { }
