import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {path: 'items', component: ItemsComponent},
  {path: 'item-details/:itemCode', component: ItemDetailsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'basket', component: BasketComponent},
  {path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
