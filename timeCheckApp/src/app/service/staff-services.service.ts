import { Injectable } from '@angular/core';
import { People } from '../models/people-model';
import { HttpClient } from '@angular/common/http';
import { PeopleTimingInfo } from "../models/people-timing-info-models";
import { EnterAndLeaveTimes } from "../models/people-timing-info-models";

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
  deleteStaff(data) {
    return this._http.post<People>('http://localhost:8000/deleteStaff', data)
  }
  getStaffInfo() {
    return this._http.post<PeopleTimingInfo[]>('http://localhost:8000/getStaffInfo', {});
  }
  saveStaffInfo(id) {
    let data = {
      id: id,
      showCurrentDayTiming: false,
      joined: new Date().toDateString(),
      timing: [],
    }
    return this._http.post<PeopleTimingInfo>('http://localhost:8000/saveStaffInfo', data);
  }
  addStaffTiming({ id, times }: { id: string, times: EnterAndLeaveTimes }) {
    let data = {
      date: new Date().toDateString(),
      id: id,
      times: times
    }
    return this._http.post('http://localhost:8000/saveEnterAndLeaveTimes', data);

  }
  deleteStaffTimingInfo(data) {
    return this._http.post<PeopleTimingInfo>('http://localhost:8000/deleteStaffTimingInfo', data)
  }
  putStaffTImingInfo(data) {
    return this._http.post<PeopleTimingInfo>('http://localhost:8000/putStaffTimingInfo', data);
  }


}
