import { Component, OnInit } from '@angular/core';
import { People } from "../../models/people-model";
import { FlashMessagesModule } from "angular2-flash-messages/module/module";
import { FlashMessagesService } from "angular2-flash-messages";
import { StaffServicesService } from "../../service/staff-services.service";
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleTimingInfo } from "../../models/people-timing-info-models";
import { Months } from "../../models/people-timing-info-models";
import { EmitService } from 'src/app/service/emit-service.service';


@Component({
  selector: 'app-people-info',
  templateUrl: './people-info.component.html',
  styleUrls: ['./people-info.component.css']
})
export class PeopleInfoComponent implements OnInit {
  id: string;
  staff: People;
  staffTimingInfo: PeopleTimingInfo;
  months: Months[] = [];
  monthToRender: Months;
  monthsToDelete: Months[] = [];



  constructor(
    private _staffServices: StaffServicesService,
    private _flashMessages: FlashMessagesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private emitService: EmitService
  ) { }

  ngOnInit() {
    //
    // this.emitService.data.subscribe(people => {
    //   console.log("people-info", people);
    // });
    this.id = this._route.snapshot.params['id'];
    this._staffServices.getStaff().subscribe(res => {
      var str = JSON.stringify(res);
      var arr = JSON.parse(str);
      arr.forEach(element => {
        if (element.id === this.id) {
          this.staff = element;
          this.staff.firstName = this.capitalizeFirstLetter(this.staff.firstName)
          this.staff.lastName = this.capitalizeFirstLetter(this.staff.lastName)
        }
      });
      this.getTimingDetails();
    })
  }
  getTimingDetails() {
    this._staffServices.getStaffInfo().subscribe(res => {
      let data: PeopleTimingInfo[] = res;
      data.map(staffTiming => {
        if (staffTiming.id === this.staff.id) {
          this.staffTimingInfo = staffTiming;
        }
      })
      this.putDatesInMonth(this.staffTimingInfo)
      //this.deleteOldInformation()
    })
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1, (string.length));

  }
  putDatesInMonth(personInfo) {
    personInfo.timing.map(personTimings => {
      var personTimingsMonth = (personTimings.date).slice(4, 7);
      if (this.months.length > 0) {
        this.months.map((monthsForRender, index) => {
          if (monthsForRender.month === personTimingsMonth) {
            monthsForRender.dates.push(personTimings);
          } else if (index === this.months.length - 1) {
            var newMonth: Months = {
              showParameter: false,
              month: personTimingsMonth,
              dates: [personTimings]
            }
            this.months.push(newMonth);
          }
        })
      } else {
        var newMonth: Months = {
          showParameter: false,
          month: personTimingsMonth,
          dates: [personTimings]
        }
        this.months.push(newMonth);
      }
    })
    this.monthToRender = this.months[0];

  }
  changeMonth(e) {
    this.months.map(neededMonth => {
      if (neededMonth.month === (e.target.value)) {
        this.monthToRender = neededMonth;
      }
    })

  }
  deleteOldInformation() {

    var currentMonth = (new Date().toDateString()).slice(4, 7)
    this.months.map((monthForDelete, index) => {
      if (monthForDelete.month === currentMonth) {
        //console.log(this.months[index + 2])
        for (let i = index + 2; i < this.months.length; i++) {
          this.monthsToDelete.push(this.months[i])
        }
        if (this.months[index + 2]) {
          this.months.splice(index + 2, this.months.length);
          //aq exla ragac arrays unda mivanicho wasashlelebi da mere unda gadavugzavno washlis requesti
        }
      }
    })
    // console.log(this.months)
    // console.log(currentMonth)
  }
}

