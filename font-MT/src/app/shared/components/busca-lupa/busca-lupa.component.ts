import { Component,signal } from '@angular/core';
import { ICabecera } from '../../types/interfaces/ICabecera';

@Component({
  selector: 'busca-lupa',
  templateUrl: './busca-lupa.component.html',
  styleUrls: ['./busca-lupa.component.css']
})
export class BuscaLupaComponent {
  list = signal([]);
  cabecera: ICabecera [] = [];

  constructor(){

    this.cabecera = [
      {
        name: 'id_tiposervicio',
        isShow: false,
        campo: 'id_tiposervicio'
      },
      {
        name: 'TIPO',
        isShow: true,
        campo: 'TIPOSERVICIO'
      },
      {
        name: 'DESCRIPCION',
        isShow: true,
        campo: 'DESCRIPCION'
      },
     {
       name: 'ID',
       isShow: false,
       campo: 'id'
     }
    ];

  }

 
}
