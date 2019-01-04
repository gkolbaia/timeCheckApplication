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
      console.log(this.people)
    })
  }
  personWorking(person) {
    person.personWorking = !person.personWorking;
    if (person.personWorking === true) {
      person.enterTime = new Date();
      console.log(person);

    } else {
      person.leaveTime = new Date();
      person.workingTime += Math.round((person.leaveTime.getTime() - person.enterTime.getTime()) / 1000 / 60);
      person.enterTime = null;
      this._services.putStaff(person as People).subscribe()

    }
  }
  calculateSalary(person) {
    person.salaryForMonth = person.workingTime * person.salaryPerhour;
  }
  onNewStaff(staff: People) {
    this.people.unshift(staff);
  }
  deleteStaff(person) {
    this._services.deleteStaff(person).subscribe((person) => {
      console.log(person);
    });
    for (let i = 0; i < this.people.length; i++) {
      if (this.people[i].id === person.id) {
        this.people.splice(i, 1);
      }
    }

  }
}

