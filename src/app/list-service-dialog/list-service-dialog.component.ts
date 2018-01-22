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
  
  
  dataFromOthercomponent:any;
  constructor(private _listService : ListServiceService,
              private dialogRef: MatDialogRef<ListServiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.dataFromOthercomponent = this.data.idBuilding;
    console.log(this.data);
  }

  onCloseConfirm() {
    this._listService.addService({Name:'testfromfront',BuildingId:2}).subscribe(
      data =>{
        alert('Service Added Successfully!');
      },
      error => {
        console.error("Error saving Service!");
    }

    );
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
