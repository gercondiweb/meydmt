import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdmClienteComponent, AdmTecnicosComponent, ClientesComponent, TecnicosComponent } from '../dashboard/pages';
import { TablerotranspComponent } from './pages/tablerotransp/tablerotransp.component';
import { LayoutComponent } from './layout/layout.component';
import { TipovehiculoComponent } from './pages/tipovehiculo/tipovehiculo.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { AdmvehiculosComponent } from './pages/admvehiculos/admvehiculos.component';
import { ZonasComponent } from './pages/zonas/zonas.component';
import { AdmzonasComponent } from './pages/admzonas/admzonas.component';
import { PropietariosComponent } from './pages/propietarios/propietarios.component';
import { AdmpropietariosComponent } from './pages/admpropietarios/admpropietarios.component';
import { RecorridosComponent } from './pages/recorridos/recorridos.component';
import { AdmrecorridosComponent } from './pages/admrecorridos/admrecorridos.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { AdmgastosComponent } from './pages/admgastos/admgastos.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { AdmtarifasComponent } from './pages/admtarifas/admtarifas.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path:'tablerotransp',
        component:TablerotranspComponent
      },
      {
        path: '',
        redirectTo: 'tablerotransp',
        pathMatch: 'full'
      },
      {
        path: 'clientes',
        component:ClientesComponent
      },
      {
        path: 'admclientes/:accion',
        component:AdmClienteComponent
      },
      {
        path: 'tecnicos',
        component:TecnicosComponent
      },
      {
        path: 'admtecnicos/:accion',
        component:AdmTecnicosComponent
      },
      {
        path: 'gastos',
        component:GastosComponent
      },
      {
        path: 'admgastos/:accion',
        component:AdmgastosComponent
      },
      {
        path: 'tarifas',
        component:TarifasComponent
      },
      {
        path: 'admtarifas/:accion',
        component:AdmtarifasComponent
      },
      {
        path: 'vehiculos',
        component:VehiculosComponent
      },
      {
        path: 'admvehiculos/:accion',
        component:AdmvehiculosComponent
      },
      {
        path: 'tipovehiculos',
        component:TipovehiculoComponent
      },
      {
        path: 'admtipovehiculos/:accion',
        component:AdmClienteComponent
      },
      {
        path: 'zonas',
        component:ZonasComponent
      },
      {
        path: 'admzonas/:accion',
        component:AdmzonasComponent
      },
      {
        path: 'propietarios',
        component:PropietariosComponent
      },
      {
        path: 'admpropietarios/:accion',
        component:AdmpropietariosComponent
      },
      {
        path: 'recorridos',
        component:RecorridosComponent
      },
      {
        path: 'admrecorridos/:accion',
        component:AdmrecorridosComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'tablerotransp',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporteRoutingModule { }
