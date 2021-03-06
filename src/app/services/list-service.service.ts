import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import{Service} from '../Model/service';
@Injectable()
export class ListServiceService {

  constructor(private _http: Http) { }
  getServicesByBuildingId(id:number): Observable<any> {
    return this._http
           .get('/api/MainServices/ByBuildingId?buildingId='+id)
           .map(response => { return response.json(); });
 }
 getServiceByMainServiceId(id:number):Observable<any>{
   return this._http
              .get('api/Services/ByMainServiceId?mainServiceId='+id)
              .map(response =>{return response.json();})
 }
 getStatusService(id:number):Observable<any>{
   return this._http
              .get('/api/MainServices/GetStatus/'+id)
              .map(response => {return response})
 }
 addMainService(mainService){
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
   let body = JSON.stringify(mainService);
   return this._http.post('/api/MainServices/',body,options).map((res: Response) => res.json())
 }
 addService(service ){
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   let body = JSON.stringify(service);
   return this._http.post('/api/Services/',body,options).map((res: Response) => res.json())

 }
 deleteService(serviceId){
   return this._http.delete('/api/Services/'+serviceId);
 }
 
 deleteMainService(mainServiceId){
  return this._http.delete('/api/MainServices/'+mainServiceId);
 }
  colorStatus(){
    var color =['DarkGrey ','LimeGreen ','Red','Yellow','Magenta'];
    return color;
  }
}
