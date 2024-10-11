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
import { ModaltarifaComponent } from './pages/modaltarifa/modaltarifa.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { AdmrutasComponent } from './pages/admrutas/admrutas.component';
import { PropietariosComponent } from './pages/propietarios/propietarios.component';
import { AdmpropietariosComponent } from './pages/admpropietarios/admpropietarios.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { AdmgastosComponent } from './pages/admgastos/admgastos.component';



@NgModule({
  declarations: [
    LayoutComponent,
    VehiculosComponent,
    AdmvehiculosComponent,
    TarifasComponent,
    AdmtarifasComponent,
    RecorridosComponent,
    AdmrecorridosComponent,
    ForecastComponent,
    ModaltarifaComponent,
    RutasComponent,
    AdmrutasComponent,
    PropietariosComponent,
    AdmpropietariosComponent,
    GastosComponent,
    AdmgastosComponent
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
