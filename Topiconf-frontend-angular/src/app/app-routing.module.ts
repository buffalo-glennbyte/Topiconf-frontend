import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratoromgevingComponent } from "./administratoromgeving/administratoromgeving.component";

const routes: Routes = [
  {path: 'administratorOmgevingLink', component: AdministratoromgevingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
