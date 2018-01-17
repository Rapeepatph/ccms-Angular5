import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MarkerService} from '../marker.service'
//import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(private markerService: MarkerService) { }
  map: mapboxgl.Map;
  message = 'Hello from DME'
  
  // data
  source: any;
  markers: any;
data:any;
  ngOnInit() {
    //this.markers = this.mapService.getMarkers()
    this.markers = [
      {
          id: 1,
          name: 'Tower',
          lng: 102.777419,
          lat: 17.386123
      },
      {
          id: 2,
          name: 'SSR',
          lng: 102.769973,
          lat: 17.387600
      },
      {
          id: 3,
          name: 'VOR',
          lng: 102.774959,
          lat: 17.384789
      },
      {
          id: 4,
          name: 'Localizer',
          lng: 102.771181,
          lat: 17.394792
      },
      {
          id: 5,
          name: 'Glide Slope',
          lng: 102.798872,
          lat: 17.382417
      }
    ];
    this.data = this.markerService.test(this.markers);
    console.log('test',this.data);
    //this.data = new FeatureCollection(this.markers)
    this.buildMap()

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
      this.map.addSource('firebase', {
        type: 'geojson',
        data:{
          "type": "FeatureCollection",
          "features":this.data
        }
      });

      
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'circle',
        // layout: {
        //   'text-field': '{message}',
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
      this.map.on('mouseenter', 'firebase', (event)=> {  //****Do not forget change name depend on marker name
        this.map.getCanvas().style.cursor = 'pointer';

        popup.setLngLat(event.features[0].geometry.coordinates)
        .setHTML("<strong>" + event.features[0].properties.name + "</strong>")
        .addTo(this.map);
      });
      this.map.on('mouseover', 'firebase', (event)=> { //****Do not forget change name depend on marker name
        console.log("mouse over", event);
      });
      this.map.on('mouseleave', 'firebase', (event)=> { //****Do not forget change name depend on marker name
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
      
    })
  }
}
