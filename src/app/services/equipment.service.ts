import { Injectable } from '@angular/core';
import { Http,RequestOptionsArgs, Response, Headers, RequestOptions  } from '@angular/http';
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
  getStatus(nameEquip):Observable<any>{
    return this._http
                .get('/api/Equipments/GetStatus/'+nameEquip)
                .map(response => {return response.json();});
  }
  updateEquipment(equip){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(equip);
    return this._http.put('/api/Equipments/'+equip.Id,body,options).map((res: Response) => res.json())
  }

  
}
