import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';

import { AppComponent } from './app.component';
import { PeopleComponent } from './components/people/people.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';
import { StaffServicesService } from './service/staff-services.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PeopleFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [StaffServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
