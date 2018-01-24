import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder,FormArray,FormsModule,Validators } from '@angular/forms';


import {ListServiceService} from '../services/list-service.service'
import {EquipmentService} from '../services/equipment.service'
@Component({
  selector: 'app-list-service-dialog',
  templateUrl: './list-service-dialog.component.html',
  styleUrls: ['./list-service-dialog.component.css']
})
export class ListServiceDialogComponent implements OnInit {
  
  public invoiceForm: FormGroup;

    
  idBuilding:any;
  nameBuilding:string;
  arrayServices:any = null;
  arrayEquipment : any = null;
  ServiceName:any;
  constructor(private _listService : ListServiceService,
              private _equipmentService : EquipmentService,
              private _fb: FormBuilder,// For Added choice of input
              private dialogRef: MatDialogRef<ListServiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              ) { }

  ngOnInit() {
    this.idBuilding = this.data.idBuilding;
    this.nameBuilding = this.data.nameBuilding;
    this.getServiceByBuilding();
    this._equipmentService.getAllEquipments().subscribe(
      res =>this.arrayEquipment=res,
      error =>console.error('Can not get All Equipments')
    )
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows(null)])
    });
    
  }
  initItemRows(res:any) {
    return this._fb.group({
      parent:[res],
      name:[null]
    });
}
addNewRow() {
  let res=null;
        const control = <FormArray>this.invoiceForm.controls['itemRows'];
        console.log('control',control)
        const index = control.value.length-1
        console.log('index',index)
        if(index>=0) res=control.value[index].name 
        console.log(res);
        control.push(this.initItemRows(res));
}

deleteRow(index: number) {
  const control = <FormArray>this.invoiceForm.controls['itemRows'];
  control.removeAt(index);
}
  getServiceByBuilding(){
    this._listService.getServicesByBuildingId(this.data.idBuilding).subscribe(
      res=>this.arrayServices = res,
      error=>console.error('Can not get service by building id!')
    )
  }
  onCloseConfirm() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    this._listService.addService({Name:this.ServiceName,BuildingId:this.data.idBuilding}).subscribe(
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
  DeleteService(service){
    if (confirm("Are you sure you want to delete Service '" + service.name + "'?")){
      this._listService.deleteService(service.id).subscribe(
        data=>{
          alert('Service Deleted Successfully!');
          this.getServiceByBuilding()
        },
        error=>{
          console.error("Error deleting Service!"); 
          alert(error);
        }
      )
    }

  }
}
