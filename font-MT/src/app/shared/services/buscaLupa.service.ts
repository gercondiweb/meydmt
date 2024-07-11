import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { LoadingService } from './loading.service';
import { lastValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { ICabecera, Response } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BuscaLupaService {
  private readonly loadingService = inject(LoadingService);
  private readonly _hhtp = inject(HttpClient);
  public _endPoint = signal('');
  public body = signal<{ opc : string }>({ opc: 'TSRV'});
  public procces : ( params : any) => void = () => {};
  cabecera : ICabecera[] = [];
  list = signal([]);

  async cargarData(){
    this.loadingService.show();
    const { error, body } = await lastValueFrom(this._hhtp.post<Response>(environment.apiUrl.consultaservicio,this.body()));
    const [list] = body;
    this.list.update( listOld => list );
    this.loadingService.hidden();
  }

  show( proccess: ( params : any ) => void, cabecera: ICabecera ){
    this.procces = proccess;
    this.cargarData();
  }

}
