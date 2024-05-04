import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConductorRoutingModule } from './conductor-routing.module';
import { LayoutConductorComponent } from './layout/layoutConductor.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardServicesComponent } from './pages/Home/components/card-services/card-services.component';
import { HomeComponent } from './pages';


@NgModule({
  declarations: [
    LayoutConductorComponent,
    NavbarComponent,
    HomeComponent,
    CardServicesComponent
  ],
  imports: [
    CommonModule,
    ConductorRoutingModule
  ]
})
export class ConductorModule { }
