import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../../../modules/dashboard/dashboard.component";
import {CertificateDetail} from "../../../modules/certificate-detail/certificate-detail";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'certificate/:id',
        component: CertificateDetail
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutModule {
}
