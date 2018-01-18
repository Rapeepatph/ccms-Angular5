import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MapService {

  constructor(private _http: Http) {

  }
  getMarkers(): Observable<any> {
     return this._http
            .get('/api/Buildings')
            .map(response => { return response.json(); });
  }

}
