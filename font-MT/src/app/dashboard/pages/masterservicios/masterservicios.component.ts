import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from '@environments/environment';
import { LoadingService } from '@/app/shared/services/loading.service';

@Component({
  selector: 'app-masterservicios',
  standalone: false,
  templateUrl: './masterservicios.component.html',
  styleUrl: './masterservicios.component.css'
})
export class MasterserviciosComponent {

  private readonly _hhtp = inject(HttpClient);
  private readonly loadingService = inject(LoadingService);
  list = signal([]);
  opc = input<string>('TSRV');
  cabecera: { name : string, campo: string, isShow : boolean }[] = [];

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

    this.getData();
  }

  async getData(){
    this.loadingService.show();
    const { error, body } = await lastValueFrom(this._hhtp.post<Response>(environment.apiUrl.consultaservicio, { opc : this.opc() }));
    const [list] = body;
    this.list.update( listOld => list );
    this.loadingService.hidden();
  }
}

interface Response{
   error: boolean,
  status: number,
  body: any
}
