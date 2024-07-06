import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TableroAdmComponent,
        ClientesComponent,
        TicketsComponent,
        CotizacionComponent,
        ContratosComponent,
        AdmContratosComponent,
        AdmClienteComponent,
        AdmTecnicosComponent,
        AdmTicketsComponent,
        AdmTecnicocontratoComponent,
        AdmSucursalesComponent
      } from './pages';
import { userGuard } from './guard/user-guard.guard';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';
import { AdmServiciosComponent } from './pages/adm-servicios/adm-servicios.component';
import { AdmTiposerviciosComponent } from './pages/adm-tiposervicios/adm-tiposervicios.component';
import { MasterserviciosComponent } from './pages/masterservicios/masterservicios.component';
import { AdmMasterserviciosComponent } from './pages/adm-masterservicios/adm-masterservicios.component';



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
        path:'admtickets',
        component:AdmTicketsComponent
      },
      {
        path:'admtickets/:accion',
        component:AdmTicketsComponent
      },
      {
        path:'clientes',
        component:ClientesComponent
      },
      {
        path:'contratos',
        component:ContratosComponent,
      },
      {
        path:'masterservicios',
        component:MasterserviciosComponent
      },
      {
        path:'admservicios',
        component:AdmServiciosComponent
      },
      {
        path:'admtiposervicios',
        component:AdmTiposerviciosComponent
      },
      {
        path:'admmasterservicios',
        component:AdmMasterserviciosComponent
      },
      {
        path:'admmasterservicios/:accion',
        component:AdmMasterserviciosComponent
      },
      {
        path:'admcontratos',
        component:AdmContratosComponent
      },
      {
        path:'admcontratos/:accion',
        component:AdmContratosComponent
      },
      {
        path:'admclientes',
        component:AdmClienteComponent
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
        path:'admtecnicos',
        component: AdmTecnicosComponent
      },
      {
        path:'admtecnicos/:accion',
        component: AdmTecnicosComponent
      },

      {
        path:'admclientes/:accion',
        component: AdmClienteComponent
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
