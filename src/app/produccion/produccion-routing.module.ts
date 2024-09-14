import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../produccion/layout/layout.component';
import {
  TableroprodComponent,
  ProduccionComponent,
  AdmProduccionComponent,
  ConfProduccionComponent,
  FormatosComponent,
  CamposComponent,
  SeccionesComponent,
  PropiedadesComponent,
  TipopropiedadesComponent,
  AdmSeccionComponent,
  AdmPropiedadComponent,
  AdmCampoComponent,
  AdmTipopropiedadComponent
} from './pages';
import { AdmClienteComponent, AdmTecnicosComponent, ClientesComponent, TecnicosComponent } from '../dashboard/pages';


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
        path: 'conf-produccion/:accion',
        component:ConfProduccionComponent
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
        path: 'adm-seccion/:accion',
        component:AdmSeccionComponent
      },
      {
        path: 'adm-propiedad/:accion',
        component:AdmPropiedadComponent
      },
      {
        path: 'adm-campo/:accion',
        component:AdmCampoComponent
      },
      {
        path: 'adm-tipopropiedad/:accion',
        component:AdmTipopropiedadComponent
      }
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
