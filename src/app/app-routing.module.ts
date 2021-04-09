import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cocktail/:id',
    loadChildren: () => import('./cocktail-detail/cocktail-detail.module').then(m => m.CocktailDetailPageModule)
  },
  {
    path: 'my-list',
    children: [
      {
        path: '',
        loadChildren: () => import('./my-list/my-list.module').then(m => m.MyListPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./my-list-detail/my-list-detail.module').then(m => m.MyListDetailPageModule)
      }
    ]

  },
  {
    path: 'cocktail-add-or-edit',
    children: [
      {
        path: '',
        loadChildren: () => import('./cocktail-add-or-edit/cocktail-add-or-edit.module').then( m => m.CocktailAddOrEditPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./cocktail-add-or-edit/cocktail-add-or-edit.module').then( m => m.CocktailAddOrEditPageModule)
      }
    ]

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
