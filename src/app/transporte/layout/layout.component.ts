import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../shared/modules/shared/shared.module";
import { ItemNavigate } from '../../shared/types/interfaces';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  items!: ItemNavigate[];
  sigla: string = 'Meyd TR';

  ngOnInit(): void {
    this.items = [
      {
        icon: 'dashboard',
        ruta: '/transporte/tablerotransp',
        name: 'Tablero'
      },
      {
        icon: 'feed',
        ruta: '/transporte/recorridos',
        name: 'Servicios'
      },
      {
        icon: 'feed',
        ruta: '/transporte/calendario',
        name: 'Calendario'
      },
      {
        icon: 'car',
        ruta: '/transporte/calendario2',
        name: 'Agenda Flota'
      },
      {
        icon: 'feed',
        ruta: '/transporte/forecast',
        name: 'Forecast'
      },
      {
        icon: 'feed',
        ruta: '/transporte/gastos',
        name: 'Gastos'
      },
      {
        icon: 'feed',
        ruta: '/transporte/rutas',
        name: 'Rutas'
      },
      {
        icon: 'feed',
        ruta: '/transporte/tarifas',
        name: 'Tarifas'
      },
      {
        icon: 'feed',
        ruta: '/transporte/zonas',
        name: 'Zonas'
      },
      {
        icon: 'domain',
        ruta: '/transporte/clientes',
        name: 'Clientes'
      },
      {
        icon: 'apps',
        ruta: '/transporte/vehiculos',
        name: 'Vehiculos',
        submenu: [
          {
            icon: 'subdirectory_arrow_right',
            ruta: '/transporte/propietarios',
            name: 'Proveedores'
          },
          {
            icon: 'subdirectory_arrow_right',
            ruta: '/transporte/tipovehiculos',
            name: 'Tipos de Vehiculo'
          }
        ]
      },
      {
        icon: 'group',
        ruta: '/produccion/tecnicos',
        name: 'Conductores'
      },
      {
        icon: 'monitoring',
        ruta: '/produccion/informes',
        name: 'Informes'
      }
     ]
  }


}
