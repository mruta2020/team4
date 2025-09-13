import {Routes} from '@angular/router';
import {CertificateDetail} from "./modules/certificate-detail/certificate-detail";
import {Login} from "./modules/login/login";
import {LayoutComponent} from "./core/layout/layout/layout.component";
import {authGuard} from "./guard/auth.guard";

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
    component: LayoutComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
