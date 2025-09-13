import {Routes} from '@angular/router';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {SignInComponent} from './modules/sign-in/sign-in.component';
import {CertificateDetail} from "./modules/certificate-detail/certificate-detail";

export const routes: Routes = [
  {
    path: 'ente/login',
    data: {type: 'ente'},
    component: SignInComponent
  },
  {
    path: 'user/login',
    data: {type: 'user'},
    component: SignInComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'certificate/:id',
    component: CertificateDetail
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
