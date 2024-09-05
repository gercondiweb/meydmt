import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduccionRoutingModule } from './produccion-routing.module';

import { TableroprodComponent } from './pages/tableroprod/tableroprod.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../shared/modules/shared/shared.module";

@NgModule({
  declarations: [
    LayoutComponent,
    TableroprodComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    SharedModule
],

  providers:[],
})
export class ProduccionModule { }
