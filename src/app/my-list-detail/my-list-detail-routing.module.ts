import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyListDetailPage } from './my-list-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MyListDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyListDetailPageRoutingModule {}
