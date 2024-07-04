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
  AdmComentsComponent,
} from './pages';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { ModalComponent } from './pages/tickets/modal/modal.component';
import { AdmClienteComponent } from './pages/adm-cliente/adm-cliente.component';
import { AdmServiciosComponent } from './pages/adm-servicios/adm-servicios.component';
import { AdmTiposerviciosComponent } from './pages/adm-tiposervicios/adm-tiposervicios.component';
import { MasterserviciosComponent } from './pages/masterservicios/masterservicios.component';
import { DatePipe } from '@angular/common';
import { AdmTecnicocontratoComponent } from './pages/adm-tecnicocontrato/adm-tecnicocontrato.component';
import { AdmEspecialidadComponent } from './pages/adm-especialidad/adm-especialidad.component';
import { AdmDocumentosComponent } from './pages/adm-documentos/adm-documentos.component';
import { TecnicoEspecialidadComponent } from './pages/tecnico-especialidad/tecnico-especialidad.component';
import { AdmMasterserviciosComponent } from './pages/adm-masterservicios/adm-masterservicios.component';


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
    MasterserviciosComponent,
    AdmTecnicocontratoComponent,
    AdmEspecialidadComponent,
    AdmDocumentosComponent,
    TecnicoEspecialidadComponent,
    AdmMasterserviciosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class DashboardModule { }
