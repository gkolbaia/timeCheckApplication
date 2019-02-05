//SHOW PARAMETERS RO CHAMOVSHLI UNDA IXSNEBODES AXALI NAMUSHEVARI DRO DA PULI
import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/people-model';
import { StaffServicesService } from '../../service/staff-services.service'
import { PeopleTimingInfo, Timing } from "../../models/people-timing-info-models";
import { EnterAndLeaveTimes } from "../../models/people-timing-info-models";
import { Router } from "@angular/router";
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: People[];
  peopleTimingInfo: PeopleTimingInfo[];
  showPeopleParameters: boolean = false;


  constructor(
    private _services: StaffServicesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._services.getStaff().subscribe((res: People[]) => {
      this.people = res;
    })
    this._services.getStaffInfo().subscribe(res => {
      this.peopleTimingInfo = res;
    }
    )
  }
  personWorking(person: People) {
    person.working = !person.working;
    if (person.working === true) {
      person.enterTime = new Date().getTime();
      this._services.putStaff(person as People).subscribe();
    } else {
      person.leaveTime = new Date();
      person.workingTime += Math.round((person.leaveTime.getTime() - person.enterTime) / 1000 / 60);
      let EnterAndLeaveTimes = { enterTime: this.getOnlyTimeFromNewDate(new Date(person.enterTime)), leaveTime: this.getOnlyTimeFromNewDate(person.leaveTime) }
      this.timingAdd(person, EnterAndLeaveTimes);

      for (let i = 0; i < this.peopleTimingInfo.length; i++) {
        if (person.id === this.peopleTimingInfo[i].id) {
          this._services.putStaffTImingInfo(this.peopleTimingInfo[i]).subscribe();
        }
      }
      this._services.putStaff(person as People).subscribe();
    }
  }
  timingAdd(person: People, times: EnterAndLeaveTimes) {
    for (let i = 0; i < this.peopleTimingInfo.length; i++) {
      //ROMELI TIPIS TIMING MONACEMEBI GVINDA IMIS GARKVEVA
      if (person.id === this.peopleTimingInfo[i].id) {
        //TU AQVS SAIERTOD SHEMOSVLA DA GASVLA
        if (this.peopleTimingInfo[i].timing.length > 0) {
          for (let j = 0; j < this.peopleTimingInfo[i].timing.length; j++) {
            //DGES ARIS TU ARIS SHEMOSULI
            if (this.peopleTimingInfo[i].timing[j].date === new Date().toDateString()) {
              this.peopleTimingInfo[i].timing[j].enterAndLeaveTImes.push(times);
              return;
              //DGES TU AR ARIS SHEMOSULI
            } else if (j === (this.peopleTimingInfo[i].timing.length - 1)) {

              let timing1: Timing = {
                date: new Date().toDateString(),
                enterAndLeaveTImes: [times]
              }
              this.peopleTimingInfo[i].timing.unshift(timing1);
              return;
            }
          }
        } else {
          let timing: Timing = {
            date: new Date().toDateString(),
            enterAndLeaveTImes: [times]
          }
          this.peopleTimingInfo[i].timing.unshift(timing)

        }
      }
    }
  }
  calculateSalary(person) {
    if (!person.working) {
      person.salaryForMonth = Math.round((person.workingTime / 60) * person.salaryPerhour);
      this._services.putStaff(person as People).subscribe();
    } else {
      var workingTime = person.workingTime + Math.round(((new Date().getTime()) - person.enterTime) / 1000 / 60)
      person.salaryForMonth = Math.round((workingTime / 60) * person.salaryPerhour)

    }
  }
  deleteStaff(person) {
    if (confirm('Are You Sure?')) {
      this._services.deleteStaff(person).subscribe();
      for (let i = 0; i < this.people.length; i++) {
        if (this.people[i].id === person.id) {
          this.people.splice(i, 1);
        }
      };
      this._services.deleteStaffTimingInfo(person).subscribe();
    }
  }
  getOnlyTimeFromNewDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let neededAns = `${hours}:${minutes}:${seconds}`
    return neededAns;
  }
  showPersonParametersButton(person: People) {
    person.showPersonParameter = !person.showPersonParameter;
    if (person.showPersonParameter === true) {
      person.salaryForMonth = null;
    }
  }
  loopFunctionForRestartPeriod(callback) {
    var array = this.people;
    if (array.length > 0) {
      var x = array[0];
      array.shift();
      this._services.putStaff(x).subscribe(res => {
        this.loopFunctionForRestartPeriod(callback);
      })
    } else {
      callback()
    }
  }
  restartPeriod() {
    if (confirm('Are You Sure, you want to restart this period?')) {

      this.people.map(element => {
        if (element.working === true) {
          element.enterTime = new Date().getTime();
          element.workingTime = null;
          element.salaryForMonth = null;
        } else {
          element.workingTime = null;
          element.salaryForMonth = null;
        }
      });
      var self = this;
      this.loopFunctionForRestartPeriod(function () {
        self._services.getStaff().subscribe((res: People[]) => {
          self.people = res;
        })
      })
    }
  }
  // deleteOldInfo() {
  //   if (confirm('The Timing Information that is older than two month, will be deleted')) {
  //     var x = new Date().getMonth();
  //     this._services.getStaffInfo().subscribe(res => {
  //       res.map((personTiming, index1) => {
  //         personTiming.timing.map((dates, index) => {
  //           if ((new Date(dates.date).getMonth() - x > 2)) {
  //             res[index1].timing.splice(index, res[index1].timing.length)

  //           }
  //         })
  //       })
  //     })
  //   }
  // }
}

