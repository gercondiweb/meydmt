import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {
  TableroAdmComponent,
  ClientesComponent,
  TicketsComponent,
  ContratosComponent,
  AdmContratosComponent,
  AdmSucursalesComponent,
  AdmAreasComponent,
  AdmTecnicosComponent,
  TecnicosComponent,
  AdmTicketsComponent,
  AdmComentsComponent
} from './pages';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { ModalComponent } from './pages/tickets/modal/modal.component';
import { AdmClienteComponent } from './pages/adm-cliente/adm-cliente.component';
import { AdmServiciosComponent } from './pages/adm-servicios/adm-servicios.component';
import { AdmTiposerviciosComponent } from './pages/adm-tiposervicios/adm-tiposervicios.component';
import { MasterserviciosComponent } from './pages/masterservicios/masterservicios.component';





@NgModule({
  declarations: [
    LayoutComponent,
    TableroAdmComponent,
    SelectDateComponent,
    ClientesComponent,
    TicketsComponent,
    ModalComponent,
    ContratosComponent,
    AdmContratosComponent,
    TecnicosComponent,
    AdmClienteComponent,
    AdmSucursalesComponent,
    AdmTecnicosComponent,
    AdmAreasComponent,
    AdmClienteComponent,
    AdmTicketsComponent,
    AdmComentsComponent,
    AdmServiciosComponent,
    MasterserviciosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,

  ]
})
export class DashboardModule { }
