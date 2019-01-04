import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { People } from 'src/app/models/people-model';
import { StaffServicesService } from
  '../../service/staff-services.service'


@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {

  showUserForm: boolean = false;
  staff: People = {
    id: '',
    firstName: '',
    lastName: '',
    joined: null,
    showPersonParameter: false,
    working: false,
    salaryPerhour: null,
    salaryForMonth: null,
    workingTime: null,
    enterTime: null,
    leaveTime: null,
  };
  @Output() newStaff: EventEmitter<People> = new EventEmitter();
  constructor(private _services: StaffServicesService) { }

  ngOnInit() {

  }
  addUser(e, firstName, lastName, sallaryPerHour) {
    this.staff.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    this.staff.firstName = firstName;
    this.staff.lastName = lastName;
    this.staff.salaryPerhour = sallaryPerHour;
    this.staff.joined = new Date().toLocaleDateString();
    this._services.saveStaff(this.staff as People).subscribe((staff) => {
      this.newStaff.emit(staff);
    });
    this.staff.firstName = '';
    this.staff.lastName = '';
    this.staff.salaryPerhour = null;
    e.preventDefault();
  }


}


