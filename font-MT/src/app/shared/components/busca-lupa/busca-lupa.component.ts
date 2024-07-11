import { Component, computed, signal, inject } from '@angular/core';
import { ICabecera } from '../../types/interfaces/ICabecera';
import { BuscaLupaService } from '../../services/buscaLupa.service';

@Component({
  selector: 'busca-lupa',
  templateUrl: './busca-lupa.component.html',
  styleUrls: ['./busca-lupa.component.css']
})
export class BuscaLupaComponent {
  private readonly buscaLupaService = inject(BuscaLupaService);
  list = signal([]);
  cabecera: ICabecera [] = [];
  isShow = computed( () => this.buscaLupaService.isShow() )

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
