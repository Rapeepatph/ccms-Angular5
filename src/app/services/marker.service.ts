import { Injectable } from '@angular/core';
import {Marker} from '../Model/marker';
import { markParentViewsForCheck } from '@angular/core/src/view/util';
@Injectable()
export class MarkerService {

  constructor() { }

  MakeGeoJson(arrayMarkers : Array<Marker>){
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

}
