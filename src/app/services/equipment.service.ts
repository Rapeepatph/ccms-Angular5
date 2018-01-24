import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class EquipmentService {

  constructor(private _http: Http) { }
  getAllEquipments():Observable<any>{
    return this._http
              .get('/api/Equipments')
              .map(response => {return response.json();});
  }
}
