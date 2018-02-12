import { Injectable } from '@angular/core';
import {Marker} from '../Model/marker';
import { markParentViewsForCheck } from '@angular/core/src/view/util';
@Injectable()
export class MarkerService {

  constructor() { }

  MakeArrayGeoJson(arrayMarkers : Array<Marker>){
    let featureData = [];
    for(let markerObj of arrayMarkers){
      let obj = {
        "type": 'Feature',
        'properties':{
          id:markerObj.id,
          name:markerObj.name
        },
        'geometry':{
          "type": "Point",
          'coordinates':[
            markerObj.lng,markerObj.lat
          ]
        }
      }
      featureData.push(obj);
    }

    return featureData;
  }

  MakeGeoJson(marker:Marker){
    let obj = {
      "type": 'Feature',
      'properties':{
        id:marker.id,
        name:marker.name
      },
      'geometry':{
        "type": "Point",
        'coordinates':[
          marker.lng,marker.lat
        ]
      }
    }
    return obj;
  }


}
