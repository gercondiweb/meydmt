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
      ruta: '/produccion/tableroprod',
      name: 'Tablero'
    },
    {
      icon: 'feed',
      ruta: '/produccion/produccion',
      name: 'Ordenes'
    },
    {
      icon: 'domain',
      ruta: '/produccion/clientes',
      name: 'Clientes'
    },
    {
      icon: 'apps',
      ruta: '/produccion/formatos',
      name: 'Formatos',
      submenu: [
        {
          icon: 'subdirectory_arrow_right',
          ruta: '/produccion/campios',
          name: 'Campos'
        },
        {
          icon: 'subdirectory_arrow_right',
          ruta: '/produccion/secciones',
          name: 'Secciones'
        }
      ]
    },
    {
      icon: 'group',
      ruta: '/produccion/tecnicos',
      name: 'Tecnicos'
    },
    {
      icon: 'monitoring',
      ruta: '/produccion/informes',
      name: 'Informes'
    }
   ]
  }

}
