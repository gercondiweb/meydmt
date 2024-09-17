import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../produccion/layout/layout.component';
import {
  TableroprodComponent,
  ProduccionComponent,
  FormatosComponent,
  CamposComponent,
  SeccionesComponent,
  PropiedadesComponent,
  TipopropiedadesComponent,
  AdmConfigformatoComponent,
  AdmSeccionComponent,
  AdmCamposComponent,
  
 
} from './pages';
import { AdmClienteComponent, AdmTecnicosComponent, ClientesComponent, TecnicosComponent } from '../dashboard/pages';
import { AdmProduccionComponent } from './pages/adm-produccion/adm-produccion.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path:'tableroprod',
        component:TableroprodComponent
      },
      {
        path: '',
        redirectTo: 'tableroprod',
        pathMatch: 'full'
      },
      {
        path: 'produccion',
        component:ProduccionComponent
      },
      {
        path: 'admproduccion/:accion',
        component:AdmProduccionComponent
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
        path: 'formatos',
        component:FormatosComponent
      },
      {
        path: 'campos',
        component:CamposComponent
      },
      {
        path: 'secciones',
        component:SeccionesComponent
      },
      {
        path: 'propiedades',
        component:PropiedadesComponent
      },
      {
        path: 'tipopropiedades',
        component:TipopropiedadesComponent
      },
      {
        path: 'adm-configformato/:accion',
        component:AdmConfigformatoComponent
      },
      {
        path: 'adm-seccion/:accion',
        component:AdmSeccionComponent
      },
      {
        path: 'adm-campo/:accion',
        component:AdmCamposComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'tableroprod',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
