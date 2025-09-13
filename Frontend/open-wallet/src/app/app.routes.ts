import {Routes} from '@angular/router';
import {CertificateDetail} from "./modules/certificate-detail/certificate-detail";
import {Login} from "./modules/login/login";
import {LayoutComponent} from "./core/layout/layout/layout.component";
import {authGuard} from "./guard/auth.guard";
import {CertificatesComponent} from './modules/certificates/certificates.component';
import {DashboardComponent} from "./modules/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: 'ente/login',
    data: {type: 'ente'},
    component: Login
  },
  {
    path: 'user/login',
    data: {type: 'user'},
    component: Login
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'certificate/:id',
        component: CertificateDetail
      },
      {
        path: 'certificates',
        component: CertificatesComponent
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
