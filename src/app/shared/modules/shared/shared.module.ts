import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModulModule } from '../material-modul/material-modul.module';
import { NavegacionComponent,
          TabladinamicaComponent,
          TablaDetalleComponent,
          GraficoBarrasComponent,
          GraficoTortaComponent,
          FrmMaestroComponent,
          ModalFormComponent,
          FrmdinamicmodalComponent,
          CargardocsComponent,
          PdfComponent,
          DemograficoComponent,
          NavegacionprodComponent,
          CampoOrdenComponent,
          VistaserviciosComponent
           } from '../../components';
import { ItemNavigateComponent } from '../../components/item-navigate/item-navigate.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoadingFullComponent } from '../../components/loading-full/loading-full.component';
import { BuscaLupaComponent } from '../../components/busca-lupa/busca-lupa.component';
import { TabladinamicaTrComponent } from '../../components/tabladinamica-tr/tabladinamica-tr.component';



@NgModule({
  declarations: [
    TabladinamicaComponent,
    NavegacionComponent,
    ItemNavigateComponent,
    GraficoBarrasComponent,
    GraficoTortaComponent,
    FrmMaestroComponent,
    TablaDetalleComponent,
    ModalFormComponent,
    FrmdinamicmodalComponent,
    LoadingFullComponent,
    CargardocsComponent,
    BuscaLupaComponent,
    PdfComponent,
    DemograficoComponent,
    NavegacionprodComponent,
    CampoOrdenComponent,
    CampoOrdenComponent,
    TabladinamicaTrComponent,
    VistaserviciosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModulModule,
    NgApexchartsModule,
    NgApexchartsModule,
    GoogleMapsModule,
    ReactiveFormsModule,

  ],
  exports:[
    MaterialModulModule,
    TabladinamicaComponent,
    TablaDetalleComponent,
    NavegacionComponent,
    GraficoBarrasComponent,
    GraficoTortaComponent,
    FrmMaestroComponent,
    NgApexchartsModule,
    FormsModule,
    NgApexchartsModule,
    GoogleMapsModule,
    ModalFormComponent,
    ReactiveFormsModule,
    FrmdinamicmodalComponent,
    LoadingFullComponent,
    BuscaLupaComponent,
    ReactiveFormsModule,
    CargardocsComponent,
    BuscaLupaComponent,
    PdfComponent,
    DemograficoComponent,
    NavegacionprodComponent,
    CampoOrdenComponent,
    TabladinamicaTrComponent,
    VistaserviciosComponent
  ]
})
export class SharedModule { }
