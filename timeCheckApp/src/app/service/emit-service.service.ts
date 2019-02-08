import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

  private peopleDataSource = new BehaviorSubject<any>(null);
  data = this.peopleDataSource.asObservable();

  setPeople(people:any){
    this.peopleDataSource.next(people);
  }

}
