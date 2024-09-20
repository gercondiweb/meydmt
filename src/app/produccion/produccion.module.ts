import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduccionRoutingModule } from './produccion-routing.module';

import { TableroprodComponent } from './pages/tableroprod/tableroprod.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../shared/modules/shared/shared.module";
import { AdmConfigformatoComponent } from './pages';
import { AdmSeccionComponent } from './pages/adm-seccion/adm-seccion.component';
import { AdmCamposComponent } from './pages/adm-campos/adm-campos.component';
import { AdmPropiedadComponent } from './pages/adm-propiedad/adm-propiedad.component';
import { AdmTipopropiedadComponent } from './pages/adm-tipopropiedad/adm-tipopropiedad.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TableroprodComponent,
    AdmConfigformatoComponent,
    AdmSeccionComponent,
    AdmCamposComponent,
    AdmPropiedadComponent,
    AdmTipopropiedadComponent,
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    SharedModule
],

  providers:[],
})
export class ProduccionModule { }
