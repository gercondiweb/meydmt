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
  AdmPropiedadComponent,
  AdmTipopropiedadComponent,
  
 
} from './pages';
import { AdmClienteComponent, AdmTecnicosComponent, ClientesComponent, TecnicosComponent } from '../dashboard/pages';
import { AdmProduccionComponent } from './pages/adm-produccion/adm-produccion.component';
import { AdminCampoComponent } from './pages/admin-campo/admin-campo.component';
import { AdminSeccionComponent } from './pages/admin-seccion/admin-seccion.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';


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
        path: 'adm-campos/:accion',
        component:AdmCamposComponent
      },
      {
        path: 'adm-propiedad/:accion',
        component:AdmPropiedadComponent
      },
      {
        path: 'adm-tipopropiedad/:accion',
        component:AdmTipopropiedadComponent
      },
      {
        path: 'admin-campo/:accion',
        component:AdminCampoComponent
      },
      {
        path: 'admin-seccion/:accion',
        component:AdminSeccionComponent
      },
      {
        path: 'ingreso',
        component:IngresoComponent
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
