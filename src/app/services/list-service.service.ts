import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import{Service} from '../Model/service';
@Injectable()
export class ListServiceService {

  constructor(private _http: Http) { }
  getServices(id:number): Observable<any> {
    return this._http
           .get('/api/Buildings/'+id)
           .map(response => { return response.json(); });
 }
 addService(service ){
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   let body = JSON.stringify(service);
   return this._http.post('/api/Services/',body,options).map((res: Response) => res.json())

  
 }
}
