import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', canActivate: [AuthGuard], component: HomeComponent },   
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];
