import { Component, OnInit } from '@angular/core';
import { People } from "../../models/people-model";
import { FlashMessagesService } from "angular2-flash-messages";
import { StaffServicesService } from "../../service/staff-services.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
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
    })
  }
  onSubmit({ value, valid }: { value: People, valid: boolean }) {
    if (valid) {
      this.staff.firstName = value.firstName;
      this.staff.lastName = value.lastName;
      this.staff.email = value.email;
      this.staff.phone = value.phone;
      this.staff.salaryPerhour = value.salaryPerhour;
      this._staffServices.putStaff(this.staff).subscribe(res => {
        this._router.navigate(['/'])
      })
    } else {
      this._flashMessages.show('Fill in all fields corectly', {
        cssClass: 'alert-danger', timeout: 4000
      })
    }
  }
}
