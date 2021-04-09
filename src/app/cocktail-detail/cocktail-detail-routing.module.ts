import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CocktailDetailPage } from './cocktail-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CocktailDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocktailDetailPageRoutingModule {}
