import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import * as $ from 'jquery';


import {EquipmentService} from '../services/equipment.service'
import { error } from 'util';


declare var d3:any;  //******import * as d3 from '../../../node_modules/d3.v3/d3.v3.min.js';
@Component({
  selector: 'app-d3-dialog',
  templateUrl: './d3-dialog.component.html',
  styleUrls: ['./d3-dialog.component.css']
})
export class D3DialogComponent implements OnInit {
  //@ViewChild('chart') private chartContainer: ElementRef;
  idService:number;
  idBuilding:number;
  nameService:string;
  dataEquip:any;
  widthModal:number;
  
  margin:any;
  width:any;
  height:any;
  duration:any;
  tree:any;
  diagonal :any;
  svg :any;
  i:number;
  root:any;
  constructor(
                private _equipmentService : EquipmentService,
                private dialogRef: MatDialogRef<D3DialogComponent>, //******For close ,open dialog
                @Inject(MAT_DIALOG_DATA) private data, //******For receive data from source component 
  ) { }

     ngOnInit() {
    //console.log('rawData',this.data);
    this.widthModal=$("#tree-diagram").width();
    //console.log('datajson',JSON.parse(this.data.dataEquip));
    this.addStatus(this.data.dataEquip,this.data.headerEquipLength);

  }
 




  addStatus(data,headerLength){
    let dataobjectArray = [];
    var i=0;
    for(let element of data){
        if(i>headerLength-1){
            this._equipmentService.getStatus(element.name).subscribe(
                res=>{
                    var obj ={
                        parent:element.parent,
                        name:element.name,
                        status : res.status,
                        idofDb :res.id,
                        buildingId :res.buildingId,
                        counting:element.counting,
                        type:element.type
                    };
                    dataobjectArray.push(obj);
                    if(i==data.length-1) {
                        this.changeDataToTreeData(dataobjectArray,headerLength); 
                    }
                    i++;
                },
                error=>console.error(error)
            )  
        } 
        else{
            
            dataobjectArray.push(element);
            i++;
        } 
    }
  }
  
  changeDataToTreeData(data,headerLength) {
      
    var dataMap = data.reduce( (map, node)=> {
        //map[node.name] = node;
        if(node.type=='stdby'){
            map[node.name+node.type+node.counting] = node;
        }
        else{
            map[node.name+node.counting] = node;
        }
        return map;
    }, {});
    

    var treeData = [];
    data.forEach( (node)=> {
        var a =(node.counting>headerLength&&node.parent!='stdby')?(node.counting-1):undefined;
        var parent = (node.type=='stdby'&&node.parent!='stdby')? dataMap[node.parent+node.type+a]:dataMap[node.parent+a];
        // add to parent
        //var parent = dataMap[node.parent];
        if (parent) {
            // *****create child array if it doesn't exist
            (parent.children || (parent.children = []))
             //****** add node to child array
             .push(node);
        } else {
            //******parent is null or missing
            treeData.push(node);
        }
    
    });
    //return treeData ;
    this.generate(treeData,this.data.nameService,this.widthModal)
  }


  generate(treeData, nameofService, widthModal) {
    if (widthModal<=0)
        widthModal = 1523;
    // ************** Generate the tree diagram	 *****************
    this.margin = { top: 20, right: 120, bottom: 20, left: 120 },
    this.width = widthModal - this.margin.right - this.margin.left,
    this.height = 200 - this.margin.top - this.margin.bottom;

    this.i = 0;
    

    this.duration = 750;

    this.tree = d3.layout.tree()
        .size([this.height, this.width]);

    this.diagonal = d3.svg.diagonal()
        .projection( (d)=> { return [d.y, d.x]; });




    this.svg = d3.select("#tree-diagram").append("svg")
        .attr("width", this.width +this.margin.right+this.margin.left)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.svg.append("text")
  .attr("class", "title")
  .text('Service Name : '+ nameofService);


    this.root = treeData[0];
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;

    this.updateDiagram(this.root);

    //d3.select(self.frameElement).style("height", "500px");
  }


updateDiagram(source) {


    //******Compute the new tree layout.
    var nodes = this.tree.nodes(this.root).reverse(),
        links = this.tree.links(nodes);

    //****** Normalize for fixed-depth.
    nodes.forEach( (d)=> { 
        if(d.parent==null){
            this.AddStatusMainStdBy(d);
        }
        d.y = d.depth * this.width / nodes.length; 
    });
    //****** Update the nodes…
    var node = this.svg.selectAll("g.node")
        .data(nodes,  (d)=> { return d.id || (d.id = ++this.i); });

    //****** Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform",  (d)=> { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click",(event)=>{
            this.click(event);
        });

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill",  (d)=> { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
        .attr("x",  (d)=>{ return d.children || d._children ? -13 : 13; })
        .attr("dy", ".35em")
        .attr("text-anchor",  (d)=> { return d.children || d._children ? "end" : "start"; })
        .text( (d)=> { 
            var index = d.name.lastIndexOf("_");
            if(index>0){
                var result = d.name.substr(0,index);
                return result;
            }
            else{
                return d.name;
            } 
        })
        .style("fill-opacity", 1e-6);

    //****** Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(this.duration)
        .attr("transform",  (d)=> { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 10)
        .style("fill",  (d)=> {
            if (d.status == 3) return "yellow";
            else if(d.status==1) return "#fff";
            // return d.status == 2 ? "red" : "Magenta";
            else if(d.status==2) return "red";
            else  return "DarkGrey ";
        });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    //****** Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr("transform",  (d) =>{ return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);


    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    //****** Update the links…
    var link = this.svg.selectAll("path.link")
        .data(links,  (d)=> { return d.target.id; });

    //****** Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d",  (d)=> {
            var o = { x: source.x0, y: source.y0 };
            return this.diagonal({ source: o, target: o });
        });

    //****** Transition links to their new position.
    link.transition()
        .duration(this.duration)
        .attr("d", this.diagonal);

    //****** Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(this.duration)
        .attr("d",  (d)=> {
            var o = { x: source.x, y: source.y };
            return this.diagonal({ source: o, target: o });
        })
        .remove();

    //****** Stash the old positions for transition.
    nodes.forEach( (d) =>{
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

//****** Toggle children on click.
click(d){
    
    if(d.name!='stdby'||d.name!='main'){
        console.log('d click',d);
        if (d.status == 1){
            d.status = 2;
        }
        else {
            d.status = 1;
        }
        this._equipmentService.updateEquipment({Id:d.idofDb,Name:d.name,BuildingId:d.buildingId,Status:d.status}).subscribe(
            data=>{
                this.updateDiagram(d);
            },
            error =>{
                alert("Error changing status")
                console.error("Error changing status",error);
            }
        )
    }
        
        // var par = d.parent;
        // while(par!=null){
        //     if(par.name =='stdby'|| par.name=='main'){
                
        //     }
        //     else{
        //         par=par.parent;
        //     }
        // }
        


        // console.log('d',d);
        // if (d.status == 1){
        //     d.status = 0;
        // }
        // else {
        //     d.status = 1;
        // }
        //  this.updateDiagram(d);
    }
    AddStatusMainStdBy(d){
        var children = d.children;
        var mainStatus =0;
        var stdbyStatus=0;
        for(var i=0;i<children.length;i++){
            if(children[i].name=='main'){
                var childinChild = children[i].children;
                children[i].status= this.queryNode(childinChild[0]);
                mainStatus= children[i].status;
            }
            else if(children[i].name=='stdby'){
                var collectStatusEachStdby =[];
                var childinChild = children[i].children;
                if(childinChild){
                    for(var a=0;a<childinChild.length;a++){
                        collectStatusEachStdby.push(this.queryNode(childinChild[a]));
                    }
                    if(collectStatusEachStdby.includes(2)) {
                        if(collectStatusEachStdby.includes(1)){
                            children[i].status=1;                     //status node main/stdby
                            
                        }
                        else{
                            children[i].status=2; 
                        }      
                    }
                    else{
                        children[i].status=1;
                    }
                    stdbyStatus=children[i].status;
                }
                else{
                    stdbyStatus=null;
                }
                
                //stdbyStatus=1;
                
            }
        }
        if(stdbyStatus!=null&&this.data.headerEquipLength>2){
            if(mainStatus==2||mainStatus==0){                              
                if(stdbyStatus==1) d.status = 3;                    //status node serviceName
                else if(stdbyStatus==2) d.status =2;
            }
            else if(mainStatus==1){
                
                if(stdbyStatus==2) d.status=3;
                else if(stdbyStatus==0) d.status=2;
                else d.status =1;
                
            }
        }
        else{
            d.status=mainStatus;
        }
        
    }
    queryNode(childinChild){
        var alarmfound = false;
        var warnfound = false;
        var normalfound = false;
        var unknownfound = false;
        while(childinChild!=null){
            if (childinChild.status == 3) warnfound=true;
            else if(childinChild.status==1) normalfound=true;
            else if(childinChild.status==2) {
                alarmfound=true;
            }
            else unknownfound=true;


            if(childinChild.children){
                childinChild = childinChild.children[0];
            }
            else{
                childinChild=null;
            }
        }
            if(alarmfound) return 2;
            else if(warnfound) return 3;
            else if(unknownfound) return 0;
            else if(normalfound) return 1;
    }

}
