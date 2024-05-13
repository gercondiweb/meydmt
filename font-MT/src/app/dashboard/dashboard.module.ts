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
  TecnicosComponent,
} from './pages';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { ModalComponent } from './pages/tickets/modal/modal.component';





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
    TecnicosComponent
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
