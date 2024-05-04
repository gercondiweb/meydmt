import { Component, Input } from '@angular/core';
import { ModalService } from '../../../dashboard/services';
import { ActivatedRoute, Router } from '@angular/router';

export interface ElementoTabla {
  nombre: string;
}

@Component({
  selector: 'app-tabladinamica',
  templateUrl: './tabladinamica.component.html',
  styleUrl: './tabladinamica.component.css'
})
export class TabladinamicaComponent {
    @Input() dataSource: any[] = [];
    @Input() columnas: any[] = [];
    @Input() formMaestro: any;

    constructor(private route: ActivatedRoute, private router: Router){}

    editarElemento(elemento: ElementoTabla) {
      // Lógica para editar el elemento
      const route = '/' + this.formMaestro + '/' + elemento ;
      this.router.navigate([route]);

      console.log('Editar:', elemento);
    }

    eliminarElemento(elemento: ElementoTabla) {
      // Lógica para eliminar el elemento
      console.log('Eliminar:', elemento);
    }

}
