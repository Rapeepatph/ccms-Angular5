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
  functionService:any=['main','stdby'];
  selectFunctionService:string=this.functionService[0];
  headerArrayEquipment:any=null;
  isOpen:boolean = true;
  isHided:boolean=true;
  addEquip:boolean=false;
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
    
    this.LoopCheckStatus();
  }

addEquipments(){
  if(this.addEquip){
    
    this.addEquip=false;
  }
  else{
    
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows(this.selectFunctionService)])
    });
   
    this.addEquip=true;
  }
    
}
checkEquipment(index){
  const control = <FormArray>this.invoiceForm.controls['itemRows'];
  if(index>=0){
    if(control.value[index-1].name) 
      return false;
    else
      return true;
  }
  return true;
}
createdHeaderData(){
  this.headerArrayEquipment=[
    {parent:null,name:this.ServiceName},
    {parent:this.ServiceName,name:this.selectFunctionService}
  ];
}
initItemRows(res:any) {
  return this._fb.group({
    parent:[res],
    name:[null]
  });
}
LoopCheckStatus(){
  setInterval(()=>{
    // for(let service of this.arrayServices){
    //   this._listService.getStatusService(service.id).subscribe(
    //     res=>{
    //       var  data = parseInt(res._body,10); 
    //       service.status = data;
    //     },
    //     error=>{console.error("Error get service status!",error);}
    //   )
    // }
    this.checkStatus();
  },5000)
}
checkStatus(){
  for(let service of this.arrayServices){
    this._listService.getStatusService(service.id).subscribe(
      res=>{
        var  data = parseInt(res._body,10); 
        service.status = data;
      },
      error=>{console.error("Error get service status!",error);}
    )
  }
}
changeBackGround(status){
  if(status==0)
    return {background:'darkgrey'};
  else if(status==1)
    return {background:'chartreuse'};
  else if(status==2)
    return {background:'rgb(230, 95, 86)'}
  else if(status==3)
    return {background:'rgb(247, 250, 92)'}
  else if(status==4)
    return {background:'Magenta'}
}

updateStatus(status){
  if(status==0)
    return 'Unknown';
  else if(status==1)
    return 'Normal';
  else if(status==2)
    return 'Alarm';
  else if(status==3)
    return 'Warning';
  else if(status==4)
    return 'Maintenance';
}


addNewRow() {
  let res=null;
        const control = <FormArray>this.invoiceForm.controls['itemRows'];
        const index = control.value.length-1
        if(index>=0) res=control.value[index].name 
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
      res=>{this.arrayServices = res;
        this.checkStatus();
      },
      error=>console.error('Can not get service by building id!')
    )
  }

onCloseConfirm() {
  this.createdHeaderData();
    var control = <FormArray>this.invoiceForm.controls['itemRows'];
    // var arrConcat = this.headerArrayEquipment.concat(control.value);
    // console.log('arrConcat',arrConcat);


    this._listService.addService({Name:this.ServiceName,BuildingId:this.data.idBuilding,DataEquipment:JSON.stringify(control.value)}).subscribe(
      data =>{
        alert('Service Added Successfully!');
        this.getServiceByBuilding();
        this.ServiceName=null;
        this.addEquip=false;
      },
      error => {
        alert("Error saving Service!"+",status code :"+ error.status+"("+error.statusText+")");
        console.error("Error saving Service!",error);
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
