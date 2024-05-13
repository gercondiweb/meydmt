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
          FrmdinamicmodalComponent } from '../../components';
import { ItemNavigateComponent } from '../../components/item-navigate/item-navigate.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';



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
    FrmdinamicmodalComponent
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
    FrmdinamicmodalComponent
  ]
})
export class SharedModule { }
