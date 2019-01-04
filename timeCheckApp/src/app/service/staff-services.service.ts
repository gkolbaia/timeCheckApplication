import { Injectable } from '@angular/core';
import { People } from '../models/people-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffServicesService {
  sad: any;
  constructor(private _http: HttpClient) { }
  getStaff() {
    return this._http.post('http://localhost:8000/getStaff', {});
  }

  saveStaff(data) {

    return this._http.post<People>('http://localhost:8000/saveStaff', data);
  }
  putStaff(data) {
    return this._http.post<People>('http://localhost:8000/putStaff', data)
  }
  deleteStaff(data){
    return this._http.post<People>('http://localhost:8000/deleteStaff', data)
  }


}
