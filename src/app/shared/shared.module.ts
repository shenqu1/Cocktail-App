import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DetailComponent } from "./detail/detail.component";
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DetailComponent
  ]
})
export class SharedModule{}
