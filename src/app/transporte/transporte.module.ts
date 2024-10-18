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
import { Calendario1Component } from './pages/calendario1/calendario1.component';
import { AdmdocumentosComponent } from './pages/admdocumentos/admdocumentos.component';
import { Calendario2Component } from './pages/calendario2/calendario2.component';
import { TablerotranspComponent } from './pages/tablerotransp/tablerotransp.component';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';
import { InformesComponent } from './pages/informes/informes.component';
import { AdmTecnicosComponent } from './pages/adm-tecnicos/adm-tecnicos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AdmClienteComponent } from './pages/adm-cliente/adm-cliente.component';



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
    AdmgastosComponent,
    Calendario1Component,
    Calendario2Component,
    AdmdocumentosComponent,
    TablerotranspComponent,
    TecnicosComponent,
    AdmTecnicosComponent,
    InformesComponent,
    AdmdocumentosComponent,
    ClientesComponent,
    AdmClienteComponent
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
