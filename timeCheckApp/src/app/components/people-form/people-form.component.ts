import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { People } from 'src/app/models/people-model';
import { StaffServicesService } from
  '../../service/staff-services.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from "@angular/router";


@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {
  dataToRestartPeriod: People[];
  showUserForm: boolean = false;
  staff: People = {
    id: '',
    firstName: '',
    lastName: '',
    email:'',
    phone:'',
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

  constructor(
    private _services: StaffServicesService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {

  }
  onSubmit({ value, valid }: { value: People, valid: boolean }) {

    if (valid) {
      this.staff.id = this.generateId();
      this.staff.firstName = value.firstName;
      this.staff.lastName = value.lastName;
      this.staff.email = value.email;
      this.staff.email = value.email;
      this.staff.salaryPerhour = value.salaryPerhour;
      this.staff.joined = new Date().toLocaleDateString();
      this._services.saveStaff(this.staff as People).subscribe(staff=>{
        this.newStaff.emit(staff);
      });


    } else {
      this._flashMessagesService.show('Fill In all Fields Corectly', {
        cssClass: 'alert-danger', timeout: 4000
      })
    }
    this.clearFields();
    this._router.navigate(['/'])
  }



  restartPeriod() {
    this._services.getStaff().subscribe(res => {
      // var v = JSON.stringify(res);
      // var x = JSON.parse(v);
      // if (x.length > 0) {
      //   x.forEach(element => {
      //     element.salaryForMonth = null;
      //     element.workingTime = null;

      //   });

      // }
    });

  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  clearFields() {
    this.staff.firstName = '',
      this.staff.lastName = '',
      this.staff.salaryPerhour = null;
  }
}



