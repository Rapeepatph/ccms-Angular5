import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder } from '@angular/forms';

import {ListServiceService} from '../services/list-service.service'
@Component({
  selector: 'app-list-service-dialog',
  templateUrl: './list-service-dialog.component.html',
  styleUrls: ['./list-service-dialog.component.css']
})
export class ListServiceDialogComponent implements OnInit {
  
  
  idBuilding:any;
  nameBuilding:string;
  arrayServices:any = null;
  constructor(private _listService : ListServiceService,
              private dialogRef: MatDialogRef<ListServiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.idBuilding = this.data.idBuilding;
    this.nameBuilding = this.data.nameBuilding;
    this._listService.getServicesByBuildingId(this.data.idBuilding).subscribe(
      res=>this.arrayServices = res,
      error=>console.error('Can not get service by building id!')
    )
    console.log(this.data);
  }

  onCloseConfirm() {
    // this._listService.addService({Name:'testfromfront',BuildingId:2}).subscribe(
    //   data =>{
    //     alert('Service Added Successfully!');
    //   },
    //   error => {
    //     console.error("Error saving Service!");
    // }

    // );
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
