import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { HomeComponent } from './home/home.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardGuard]},
  {path: 'items', component: ItemsComponent, canActivate: [AuthGuardGuard]},
  {path: 'item-details/:itemCode', component: ItemDetailsComponent, canActivate: [AuthGuardGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]},
  {path: 'basket', component: BasketComponent, canActivate: [AuthGuardGuard]},
  {path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
