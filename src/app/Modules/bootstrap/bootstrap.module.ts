import { NgModule } from '@angular/core';


import{AlertModule,
  CollapseModule ,
  TooltipModule 
} from 'ngx-bootstrap'
@NgModule({
  imports: [
    AlertModule.forRoot(),
    CollapseModule .forRoot(),
    TooltipModule.forRoot()
  ],
  exports:[
    AlertModule,
    CollapseModule ,
    TooltipModule
  ],

  declarations: []
})
export class BootstrapModule { }
