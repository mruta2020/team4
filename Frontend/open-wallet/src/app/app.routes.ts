import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SignInComponent } from './modules/sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: '',
        component: SignInComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];
