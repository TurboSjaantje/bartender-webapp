import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';
import { DrinksComponent } from './drinks/drinks.component';
import { MixerComponent } from './mixer/mixer.component';
import { SettingsComponent } from './settings/settings.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', canActivate: [AuthGuard], component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'drinks', component: DrinksComponent, canActivate: [AuthGuard] },
    { path: 'mixer', component: MixerComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'drink/:id', component: DrinkDetailComponent, canActivate: [AuthGuard] }
];
