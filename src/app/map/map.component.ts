import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MarkerService} from '../services/marker.service'
import { MapService } from '../services/map.service';
import { GeoJson, FeatureCollection } from '../Model/map'
import { error } from 'util';

import {ListServiceService} from '../services/list-service.service'
import {EquipmentService} from '../services/equipment.service'

//---about dialog------
import { MatDialog, MatDialogRef } from '@angular/material';
import{ListServiceDialogComponent} from '../list-service-dialog/list-service-dialog.component'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  // data
  data:any;
  buildingArray: any;
  //buildingImageUrl = require("../images/Yellowcity.png");
  framesPerSecond = 15; 
  initialOpacity = 1
  opacity = this.initialOpacity;
  initialRadius = 10;
  radius = this.initialRadius;
  maxRadius = 30;

  

  listServiceDialogRef : MatDialogRef<ListServiceDialogComponent>;

  constructor(private _markerService: MarkerService,
              private _mapService:MapService,
              private _listService : ListServiceService,
              private _equipmentService : EquipmentService,
              private dialog:MatDialog) { }
  
  ngOnInit() {
    this._mapService.getMarkers().subscribe(
      res=>{
        this.data = this._markerService.MakeArrayGeoJson(res);
        console.log('coorFromDb',res);
        this.buildingArray=res;
      },
      error=>console.error(error.message)
    );

    this.buildMap();
    this.checkStatus();
  }

  openListServiceDialog(id : number,nameOfBuilding : string){
    this.listServiceDialogRef = this.dialog.open(ListServiceDialogComponent,{
      height: 'auto',
      width: '40%',
      data:{
        idBuilding:id,
        nameBuilding : nameOfBuilding
      }
    });
  }

  buildMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFwZWVwYXRwaCIsImEiOiJjamFpejVrOGgyMXBxMzNxdTQ5aWdtcTM1In0.XCwwqYiQ2AA9va7j2jUMwg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      zoom: 15,
      center:  [102.786983, 17.384628], // starting position
      bearing: 27.5 // bearing in degrees
    });

   

    this.map.on('load', (event)=>{

      //************Use icon circle**************************/
      // this.map.addSource('buildingCoord', {
      //   type: 'geojson',
      //   data:{
      //     "type": "FeatureCollection",
      //     "features":this.data
      //   }
      // });
      
      for(let building of this.buildingArray){
        let markerData = this._markerService.MakeGeoJson(building);
        this.map.addLayer({
          id: building.name+'1',
          source: {
                  "type": "geojson",
                  "data": {
                      "type": "FeatureCollection",
                      "features": [markerData]
                  }
              },
          type: 'circle',
          paint: {
            "circle-radius": 70,
          "circle-radius-transition": { duration: 0 },
          "circle-opacity-transition": { duration: 0 },
          "circle-color": "#7FFF00"
          }
        });

        this.map.addLayer({
          id:building.name,
          source: {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [markerData]
            }
        },
          type: 'circle',
          paint: {
            "circle-radius": this.initialRadius,
          "circle-color": "#007cbf"
          }
        });


        this.map.on('mouseenter', building.name, (event)=> {  //****Do not forget change name depend on marker id
          this.map.getCanvas().style.cursor = 'pointer';
  
          popup.setLngLat(event.features[0].geometry.coordinates)
          .setHTML("<strong>" + event.features[0].properties.name + "</strong>")
          .addTo(this.map);
        });
        this.map.on('mouseover', building.name, (event)=> { //****Do not forget change name depend on marker id
          console.log("mouse over", event);
        });
        this.map.on('mouseleave', building.name, (event)=> { //****Do not forget change name depend on marker id
          this.map.getCanvas().style.cursor = '';
          popup.remove();
        });
        this.map.on('click',building.name,(event)=>{   //****Do not forget change name depend on marker id
          this.openListServiceDialog(event.features[0].properties.id,event.features[0].properties.name);
        })
      }
      


      
    
      this.animateMarker(0);
      
      


      //*************Use custom icon********************************/
      // this.map.loadImage(this.buildingImageUrl,(error,image)=>{
      //   if (error) throw error;
      //   this.map.addSource('firebase', {
      //     type: 'geojson',
      //     data:{
      //       "type": "FeatureCollection",
      //       "features":this.data
      //     }
      //   });

      //   this.map.addImage('building', image);
      //   this.map.addLayer({
      //       id: 'marker',
      //       source: 'firebase',
      //       type: 'symbol',
      //       "layout": {
      //         "icon-image": "building",
      //         "icon-size": 0.08
      //     }
      //     })
      // })


      let popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      // this.map.on('mouseenter', 'marker', (event)=> {  //****Do not forget change name depend on marker id
      //   this.map.getCanvas().style.cursor = 'pointer';

      //   popup.setLngLat(event.features[0].geometry.coordinates)
      //   .setHTML("<strong>" + event.features[0].properties.name + "</strong>")
      //   .addTo(this.map);
      // });
      // this.map.on('mouseover', 'marker', (event)=> { //****Do not forget change name depend on marker id
      //   console.log("mouse over", event);
      // });
      // this.map.on('mouseleave', 'marker', (event)=> { //****Do not forget change name depend on marker id
      //   this.map.getCanvas().style.cursor = '';
      //   popup.remove();
      // });
      // this.map.on('click','marker',(event)=>{   //****Do not forget change name depend on marker id
      //   this.openListServiceDialog(event.features[0].properties.id,event.features[0].properties.name);
      // })
    })
  }


   animateMarker(timestamp){
    setTimeout(()=>{
      requestAnimationFrame((data)=>{
        this.animateMarker(data);
      })

        this.radius += (this.maxRadius - this.radius) / this.framesPerSecond;
        this.opacity -= ( .9 / this.framesPerSecond );
        if(this.opacity<0) 
          this.opacity=0;

        for(let building of this.buildingArray){
          this.map.setPaintProperty(building.name+'1', 'circle-radius', this.radius);
          this.map.setPaintProperty(building.name+'1', 'circle-opacity', this.opacity);
        }
        

        if (this.opacity <= 0) {
          this.radius = this.initialRadius;
          this.opacity = this.initialOpacity;
        } 

    }, 1000 / 15);
    
}

  checkStatus(){
    var i=0;
    setInterval(()=>{ 
      //var color =['Cyan','Blue','Red','Yellow','Magenta'];
      var color = this._listService.colorStatus();
      this.buildingArray.forEach(element => {
        this._mapService.getStatus(element.id).subscribe(
          res=>{
            var  data = parseInt(res._body,10); 
            this.map.setPaintProperty(element.name, 'circle-color', color[data]);
            this.map.setPaintProperty(element.name+'1', 'circle-color', color[data]);
          },
          error=>{
            console.error("Error get status by buildingId!",error);
          }
        )
      });
      }, 20000
    );
  }
   


}
