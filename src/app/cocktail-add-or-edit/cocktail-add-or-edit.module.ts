import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CocktailAddOrEditPageRoutingModule } from './cocktail-add-or-edit-routing.module';

import { CocktailAddOrEditPage } from './cocktail-add-or-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CocktailAddOrEditPageRoutingModule
  ],
  declarations: [CocktailAddOrEditPage]
})
export class CocktailAddOrEditPageModule {}
