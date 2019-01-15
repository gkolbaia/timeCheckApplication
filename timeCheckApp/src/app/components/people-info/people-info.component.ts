import { Component, OnInit } from '@angular/core';
import { People } from "../../models/people-model";
import { FlashMessagesModule } from "angular2-flash-messages/module/module";
import { FlashMessagesService } from "angular2-flash-messages";
import { StaffServicesService } from "../../service/staff-services.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-info',
  templateUrl: './people-info.component.html',
  styleUrls: ['./people-info.component.css']
})
export class PeopleInfoComponent implements OnInit {
  id: string;
  staff: People;

  constructor(
    private _staffServices: StaffServicesService,
    private _flashMessages: FlashMessagesService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this._staffServices.getStaff().subscribe(res => {
      var str = JSON.stringify(res);
      var arr = JSON.parse(str);
      arr.forEach(element => {
        if (element.id === this.id) {
          this.staff = element;
        }
      });
      console.log(this.staff)


    })

  }

}