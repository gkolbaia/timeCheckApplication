import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PeopleComponent } from "./components/people/people.component";
import { PeopleFormComponent } from "./components/people-form/people-form.component";
import { PeopleInfoComponent } from "./components/people-info/people-info.component";

const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'person-info/:id', component: PeopleInfoComponent },
  { path: 'adduser', component: PeopleFormComponent }

]

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
