import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TableroAdmComponent,
        ClientesComponent,
        TicketsComponent,
        CotizacionComponent,
        ContratosComponent,
        AdmContratosComponent
      } from './pages';
import { userGuard } from './guard/user-guard.guard';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path:'tablero',
        component:TableroAdmComponent
      },
      {
        path:'tickets',
        component:TicketsComponent
      },
      {
        path:'clientes',
        component:ClientesComponent
      },
      {
        path:'contratos',
        component:ContratosComponent
      },
      {
        path:'admcontratos',
        component:AdmContratosComponent
      },
      {
        path:'cotizacion',
        component: CotizacionComponent
      },
      {
        path:'tecnicos',
        component: TecnicosComponent
      },
      {
        path:'admcontratos/:accion',
        component: AdmContratosComponent
      },
      {
        path: '',
        redirectTo: 'tablero',
        pathMatch: 'full'
      },
    ],
    canActivate:[userGuard],
  },
  {
    path: '**',
    redirectTo: 'tablero',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
