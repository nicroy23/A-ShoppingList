import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AllClientListsComponent } from './all-client-lists/all-client-lists.component';

const routes: Routes = [
  { path: '', redirectTo: '/all-lists', pathMatch: 'full' },
  { path: 'all-lists', component: AllClientListsComponent },
  { path: 'list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
