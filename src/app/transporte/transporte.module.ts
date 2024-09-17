import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/modules/shared/shared.module";

import { TransporteRoutingModule } from './transporte-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { AdmvehiculosComponent } from './pages/admvehiculos/admvehiculos.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { AdmtarifasComponent } from './pages/admtarifas/admtarifas.component';



@NgModule({
  declarations: [
    LayoutComponent,
    VehiculosComponent,
    AdmvehiculosComponent,
    TarifasComponent,
    AdmtarifasComponent
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
