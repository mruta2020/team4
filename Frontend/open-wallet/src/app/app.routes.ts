import {Routes} from '@angular/router';
import {CertificateDetail} from "./modules/certificate-detail/certificate-detail";
import {Login} from "./modules/login/login";
import {LayoutComponent} from "./core/layout/layout/layout.component";
import {authGuard} from "./guard/auth.guard";
import {CertificatesComponent} from './modules/certificates/certificates.component';
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {LogAccessComponent} from "./modules/log-access/log-access";

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
      {
        path: 'certificate/:id',
        component: CertificateDetail
      },
      {
        path: 'certificates',
        component: CertificatesComponent
      },
      {
        path: 'logAccess',
        component: LogAccessComponent
      },
      {
        path: '',
        redirectTo: 'certificates',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
