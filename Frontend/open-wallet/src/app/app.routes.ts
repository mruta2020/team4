import {Routes} from '@angular/router';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {SignInComponent} from './modules/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
