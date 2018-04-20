import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder,FormArray,FormsModule,Validators } from '@angular/forms';


import {ListServiceService} from '../services/list-service.service'
import {EquipmentService} from '../services/equipment.service'


import{D3DialogComponent} from '../d3-dialog/d3-dialog.component'


@Component({
  selector: 'app-list-service-dialog',
  templateUrl: './list-service-dialog.component.html',
  styleUrls: ['./list-service-dialog.component.css'],
 
})
export class ListServiceDialogComponent implements OnInit {
  
  public invoiceForm: FormGroup;

    
  idBuilding:any;
  nameBuilding:string;
  arrayServices:any = null;
  arrayEquipment : any = null;
  ServiceName:any;
  mainServiceSelected:any=null;
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
checkConfirm(){
  // if(this.ServiceName!=null){
  //   if(this.selectFunctionService=='stdby'){
  //     if(this.mainServiceSelected != null){
  //       return false;
  //     }
  //     return true;
  //   }
  //   return false;
  // }
  // else{
  //   return true;
  // }
  if(this.selectFunctionService=='stdby'){
    if(this.mainServiceSelected){
      return false;
    }
    else{
      return true;
    }
  }
  else if(this.selectFunctionService=='main'){
    if(this.ServiceName){
      return false;
    }
    else{
      return true;
    }
  }
  else{
    return true;
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
createdHeaderData(data,countService){
  if(countService>1){
    this.headerArrayEquipment=[
      {parent:null,name:data.name},
      {parent:data.name,name:this.functionService[0]},
      {parent:data.name,name:this.functionService[1]}
    ];
  }
   else{
    this.headerArrayEquipment=[
      {parent:null,name:data.name},
      {parent:data.name,name:this.functionService[0]}
    ];
   } 
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
    return {background:'rgb(230, 95, 86)', color:'#fff'}
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
        
        if(index>=0) {
          res=control.value[index].name 
          control.push(this.initItemRows(res));
        }
       
}

deleteRow(index: number) {
  const control = <FormArray>this.invoiceForm.controls['itemRows'];
  control.removeAt(index);
}

openListD3Dialog(dataOfService:any){
  
  // console.log('serv',JSON.parse(dataOfService.dataEquipment));
  let arrayService:any=[] ;
  
  this._listService.getServiceByMainServiceId(dataOfService.id).subscribe(
    data=>{
      this.createdHeaderData(dataOfService,data.length);
      for(let serv of data){
        var jsonDataEquip = JSON.parse(serv.dataEquipment);
        arrayService= arrayService.concat(jsonDataEquip);
      }
      var arrConcat = this.headerArrayEquipment.concat(arrayService);
      console.log('arrconcat',arrConcat);
      var i=0;
      var stdbyIndex = arrConcat.findIndex(x=>x.parent==="stdby")
      for(let obj of arrConcat){
        if(i>(this.headerArrayEquipment.length-1) ){
          obj.counting = i;
        }
        if(i>=stdbyIndex&&stdbyIndex>0){
          obj.type='stdby';
        }
        i++;
        if(i>=arrConcat.length){
          
          this.createDialogRef(dataOfService,arrConcat);
          
        }
      }
      
      
    },
    error=>{
      console.error("Error deleting Service!"); 
      alert(error);
    }
  )
  //console.log('serv',dataOfService);
  
}

createDialogRef(dataOfService,arrConcat){
  this.d3DialogRef = this.dialog.open(D3DialogComponent,{
    height: 'auto',
    width: '100%',
    data:{
      idService:dataOfService.id,
      nameService : dataOfService.name,
      buildingId : dataOfService.buildingId,
      dataEquip : arrConcat,
      headerEquipLength:this.headerArrayEquipment.length
    }
  });
}

getServiceByBuilding(){
    this._listService.getServicesByBuildingId(this.data.idBuilding).subscribe(
      res=>{
        this.arrayServices = res;
        this.checkStatus();
      },
      error=>console.error('Can not get service by building id!')
    )
  }

onCloseConfirm() {
  //this.createdHeaderData();
    //var control = <FormArray>this.invoiceForm.controls['itemRows'];
    // var arrConcat = this.headerArrayEquipment.concat(control.value);
    // console.log('arrConcat',arrConcat);
    if(this.selectFunctionService=='main'){
      this._listService.addMainService({Name:this.ServiceName,BuildingId:this.data.idBuilding}).subscribe(
        data=>{
          this.addService(data.id,data.name,1);  // 1 is Main
        },
        error=>{
          alert("Error saving MainService!"+",status code :"+ error.status+"("+error.statusText+")");
        }
      )
    }
    else{
      this.addService(this.mainServiceSelected.id,this.mainServiceSelected.name+'Stdby',0);  //0 is StandBy
    }

    
    
    // this.dialogRef.close('Confirm');
  }
addService(mainServiceId,name,isSelected){
  var control = <FormArray>this.invoiceForm.controls['itemRows'];
  this._listService.addService({Name:name,MainServiceId:mainServiceId,IsSelected:isSelected,DataEquipment:JSON.stringify(control.value)}).subscribe(
    data =>{
      alert('Service Added Successfully!');
      this.getServiceByBuilding();
      this.ServiceName=null;
      this.addEquip=false;
      this.mainServiceSelected=null;
    },
    error => {
      alert("Error saving Service!"+",status code :"+ error.status+"("+error.statusText+")");
      console.error("Error saving Service!",error);
    }

  );
}
onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

DeleteService(service){
    if (confirm("Are you sure you want to delete Service '" + service.name + "'?")){
      this._listService.getServiceByMainServiceId(service.id).subscribe(
        data=>{
          var i=0;
          var last = false;
          for(let serv of data){
            i++;
            if(i==data.length){
              last=true;
              this.deleteServ(serv.id,last,service.id);
            }
            else{
              this.deleteServ(serv.id,last,service.id);
            }
          }
        },
        error=>{
          console.error("Error deleting Service!"); 
          alert(error);
        }
      )
    }
  }

  deleteServ(id,last,mainServiceId){
    this._listService.deleteService(id).subscribe(
      data=>{
        console.log('Service Deleted Success')
        if(last){
          this.deleteMainserv(mainServiceId);
        }
      },
      error=>{
        console.error("Error deleting sub Service!"); 
        alert(error);
      }
    )
  }
  deleteMainserv(id){
    this._listService.deleteMainService(id).subscribe(
      data=>{
        alert('MainService Deleted Successfully!');
        this.getServiceByBuilding()
      },
      error=>{
        console.error("Error deleting MainService!"); 
        alert(error);
      }
    )
  }
}
