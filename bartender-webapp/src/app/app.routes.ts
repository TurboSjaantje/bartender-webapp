import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DrinksComponent } from './drinks/drinks.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', canActivate: [AuthGuard], component: HomeComponent },   
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'drink/:id', component: DrinkDetailComponent, canActivate: [AuthGuard] },
    { path: 'drinks', component: DrinksComponent, canActivate: [AuthGuard]}
];
    