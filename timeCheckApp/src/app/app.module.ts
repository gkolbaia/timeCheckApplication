import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { AppComponent } from './app.component';
import { PeopleComponent } from './components/people/people.component';
import { PeopleFormComponent } from './components/people-form/people-form.component';
import { StaffServicesService } from './service/staff-services.service'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PeopleInfoComponent } from './components/people-info/people-info.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { EditComponentComponent } from './components/edit-component/edit-component.component';
import { EmitService } from './service/emit-service.service';


@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PeopleFormComponent,
    PeopleInfoComponent,
    EditComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),

  ],
  providers: [StaffServicesService, EmitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
