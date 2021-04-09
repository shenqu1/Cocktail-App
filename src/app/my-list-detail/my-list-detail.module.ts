import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyListDetailPageRoutingModule } from './my-list-detail-routing.module';

import { MyListDetailPage } from './my-list-detail.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyListDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [MyListDetailPage]
})
export class MyListDetailPageModule {}
