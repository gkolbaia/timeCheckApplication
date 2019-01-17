import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/people-model';
import { StaffServicesService } from '../../service/staff-services.service'
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: People[];
  showPeopleParameters: boolean = false;
  constructor(private _services: StaffServicesService) { }

  ngOnInit() {
    this._services.getStaff().subscribe((res: People[]) => {
      this.people = res;
    })
    //this._services.getStaffInfo().subscribe()
  }
  personWorking(person: People) {
    person.working = !person.working;
    if (person.working === true) {
      person.enterTime = new Date().getTime();
      this._services.putStaff(person as People).subscribe();
      console.log(person.workingTime)

    } else {
      person.leaveTime = new Date();
      person.workingTime += Math.round((person.leaveTime.getTime() - person.enterTime) / 1000 / 60);
      person.enterTime = null;
      this._services.putStaff(person as People).subscribe();
      console.log(person.workingTime)

    }
    console.log(person.workingTime)
  }
  calculateSalary(person) {
    if (!person.working) {
      person.salaryForMonth = Math.round((person.workingTime / 60) * person.salaryPerhour);
      this._services.putStaff(person as People).subscribe();
      console.log(person.workingTime)
    } else {
      var workingTime = person.workingTime + Math.round(((new Date().getTime()) - person.enterTime)/1000/60)
      person.salaryForMonth = Math.round((workingTime / 60) * person.salaryPerhour)
      console.log(workingTime)
    }
  }

  deleteStaff(person) {
    if (confirm('Are You Sure?')) {
      this._services.deleteStaff(person).subscribe();
      for (let i = 0; i < this.people.length; i++) {
        if (this.people[i].id === person.id) {
          this.people.splice(i, 1);
        }
      }
    }
  }
}

