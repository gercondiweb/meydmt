import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/modules/shared/shared.module";

import { TransporteRoutingModule } from './transporte-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { AdmvehiculosComponent } from './pages/admvehiculos/admvehiculos.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { AdmtarifasComponent } from './pages/admtarifas/admtarifas.component';
import { RecorridosComponent } from './pages/recorridos/recorridos.component';
import { AdmrecorridosComponent } from './pages/admrecorridos/admrecorridos.component';
import { ForecastComponent } from './pages/forecast/forecast.component';



@NgModule({
  declarations: [
    LayoutComponent,
    VehiculosComponent,
    AdmvehiculosComponent,
    TarifasComponent,
    AdmtarifasComponent,
    RecorridosComponent,
    AdmrecorridosComponent,
    ForecastComponent
  ],
  imports: [
    CommonModule,
    TransporteRoutingModule,
    SharedModule
  ],
  providers:[

  ],
})
export class TransporteModule { }
