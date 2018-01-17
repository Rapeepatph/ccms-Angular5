import { Injectable } from '@angular/core';
import {Marker} from './marker';
import { markParentViewsForCheck } from '@angular/core/src/view/util';
@Injectable()
export class MarkerService {

  constructor() { }

  test(arrayMarkers : Array<Marker>){
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
