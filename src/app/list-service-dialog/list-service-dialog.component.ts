import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder,FormArray,FormsModule,Validators } from '@angular/forms';


import {ListServiceService} from '../services/list-service.service'
import {EquipmentService} from '../services/equipment.service'


import{D3DialogComponent} from '../d3-dialog/d3-dialog.component'

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
  isOpen:boolean = true;
  isHided:boolean=true;

  d3DialogRef : MatDialogRef<D3DialogComponent>;
  constructor(private _listService : ListServiceService,
              private _equipmentService : EquipmentService,
              private _fb: FormBuilder,// For Added choice of input
              private dialog:MatDialog, // For create dialog at another component
              private dialogRef: MatDialogRef<ListServiceDialogComponent>, //For close ,open dialog
              @Inject(MAT_DIALOG_DATA) private data, //For receive data from another component that dialog is opened
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

openListD3Dialog(dataOfService:any){
  // console.log('serv',JSON.parse(dataOfService.dataEquipment));
  console.log('serv',dataOfService);
  this.d3DialogRef = this.dialog.open(D3DialogComponent,{
    height: 'auto',
    width: '100%',
    data:{
      idService:dataOfService.id,
      nameService : dataOfService.name,
      buildingId : dataOfService.buildingId,
      dataEquip : dataOfService.dataEquipment
    }
  });
}

getServiceByBuilding(){
    this._listService.getServicesByBuildingId(this.data.idBuilding).subscribe(
      res=>this.arrayServices = res,
      error=>console.error('Can not get service by building id!')
    )
  }

onCloseConfirm() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    this._listService.addService({Name:this.ServiceName,BuildingId:this.data.idBuilding,DataEquipment:JSON.stringify(control.value)}).subscribe(
      data =>{
        alert('Service Added Successfully!');
        this.getServiceByBuilding();
      },
      error => {
        alert("Error saving Service!");
        console.error("Error saving Service!");
    }

    );
    
    // this.dialogRef.close('Confirm');
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
