import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CocktailAddOrEditPage } from './cocktail-add-or-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CocktailAddOrEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocktailAddOrEditPageRoutingModule {}
