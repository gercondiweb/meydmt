import { Component, OnInit } from '@angular/core';
import { ItemNavigate } from '../../shared/types/interfaces';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  items!: ItemNavigate[];

  ngOnInit(): void {
   this.items = [
    {
      icon: 'dashboard',
      ruta: '/dashboard/tablero',
      name: 'Tablero'
    },
    {
      icon: 'feed',
      ruta: '/dashboard/tickets',
      name: 'Tikets'
    },
    {
      icon: 'domain',
      ruta: '/dashboard/clientes',
      name: 'Clientes'
    },
    {
      icon: 'apps',
      ruta: '/dashboard/contratos',
      name: 'Contratos'
    },
    {
      icon: 'group',
      ruta: '/dashboard/tecnicos',
      name: 'Tecnicos'
    },
    {
      icon: 'monitoring',
      ruta: '/dashboard/verservicios',
      name: 'Informes'
    },
    {
      icon: 'plus_one',
      ruta: '/dashboard/cotizacion',
      name: 'Cotizaciones'
    },
   ]
  }

}