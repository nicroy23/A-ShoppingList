import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AllClientListsComponent } from './all-client-lists/all-client-lists.component';
import { LoginComponent } from './login/login.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: "my-lists", pathMatch: "full", canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'my-lists', component: AllClientListsComponent, canActivate: [AuthGuardService] },
  { path: 'list/:id', component: ListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
