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
    this._services.getStaffInfo().subscribe((res)=>{
      console.log(res);
    })
  }
  personWorking(person) {
    person.personWorking = !person.personWorking;
    if (person.personWorking === true) {
      person.enterTime = new Date();
    } else {
      person.leaveTime = new Date();
      person.workingTime += Math.round((person.leaveTime.getTime() - person.enterTime.getTime()) / 1000 / 60);
      person.enterTime = null;
      this._services.putStaff(person as People).subscribe();

    }
  }
  calculateSalary(person) {
    person.salaryForMonth = (person.workingTime / 60) * person.salaryPerhour;
  }
  onNewStaff(staff: People) {
    if (!staff.firstName || !staff.lastName || !staff.salaryPerhour) {
      alert('fill in all field')
    } else {
      this.people.unshift(staff);
    }
  }
  deleteStaff(person) {
    this._services.deleteStaff(person).subscribe();
    for (let i = 0; i < this.people.length; i++) {
      if (this.people[i].id === person.id) {
        this.people.splice(i, 1);
      }
    }

  }

}

