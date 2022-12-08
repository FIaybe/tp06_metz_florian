import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./component/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'client-form', loadChildren: () => import('./component/client/client.module').then(m => m.ClientModule) },
  { path: 'catalog', loadChildren: () => import('./component/catalog/catalog.module').then(m => m.DisplayCatalogModule) },
  { path: 'basket', loadChildren: () => import('./component/basket/basket.module').then(m => m.BasketModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
