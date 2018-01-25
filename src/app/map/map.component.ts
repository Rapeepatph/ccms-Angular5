import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MarkerService} from '../services/marker.service'
import { MapService } from '../services/map.service';
import { GeoJson, FeatureCollection } from '../Model/map'
import { error } from 'util';

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
  source: any;

  listServiceDialogRef : MatDialogRef<ListServiceDialogComponent>;

  constructor(private _markerService: MarkerService,
              private _mapService:MapService,
              private dialog:MatDialog) { }
  
  ngOnInit() {
    this._mapService.getMarkers().subscribe(
      res=>this.data = this._markerService.test(res),
      error=>console.error(error.message));

    this.buildMap()

  }

  openListServiceDialog(id : number,nameOfBuilding : string){
    this.listServiceDialogRef = this.dialog.open(ListServiceDialogComponent,{
      height: '1000px',
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
      center:  [102.788247, 17.386526], // starting position
      bearing: 28 // bearing in degrees
    });


    this.map.on('load', (event)=>{
      /// register source
      this.map.addSource('firebase', {
        type: 'geojson',
        data:{
          "type": "FeatureCollection",
          "features":this.data
        }
      });
      
      
      this.map.addLayer({
        id: 'marker',
        source: 'firebase',
        type: 'circle',
        // layout: {
        //   'text-size': 40,
        //   'text-transform': 'uppercase',
        //   'icon-image': 'building',
        //   'text-offset': [0, 1.5]
        // },
        paint: {
          "circle-radius": 8,
        "circle-radius-transition": { duration: 0 },
        "circle-opacity-transition": { duration: 0 },
        "circle-color": "#007cbf"
        }
      })
      let popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      this.map.on('mouseenter', 'marker', (event)=> {  //****Do not forget change name depend on marker id
        this.map.getCanvas().style.cursor = 'pointer';

        popup.setLngLat(event.features[0].geometry.coordinates)
        .setHTML("<strong>" + event.features[0].properties.name + "</strong>")
        .addTo(this.map);
      });
      this.map.on('mouseover', 'marker', (event)=> { //****Do not forget change name depend on marker id
        console.log("mouse over", event);
      });
      this.map.on('mouseleave', 'marker', (event)=> { //****Do not forget change name depend on marker id
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
      this.map.on('click','marker',(event)=>{   //****Do not forget change name depend on marker id
        this.openListServiceDialog(event.features[0].properties.id,event.features[0].properties.name);
      })
      
    })
  }
}
