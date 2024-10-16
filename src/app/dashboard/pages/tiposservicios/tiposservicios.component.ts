import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/services/rest.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/services/data-sharing.service';

@Component({
  selector: 'app-tiposservicios',
  templateUrl: './tiposservicios.component.html',
  styleUrls: ['./tiposservicios.component.css']
})
export class TiposserviciosComponent implements OnInit {

  titulo =['Administrar Tipos de Servicios'];
  colTipoServicio = ['id', 'TIPOSERVICIO', 'DESCRIPCION'];

  listTipoServ : any;
  vTipoServicio: any;

  consultaTS = {
    opc: 'TSRV'
  }

  constructor(
    private restService: RestService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
    this.cargarTipoServicios();
  }

  cargarTipoServicios() {
    this.consultaTS.opc = 'TSRV';
    this.restService.getMaestros(this.consultaTS).subscribe((data: any) => {
      this.listTipoServ = data.body[0];
      this.vTipoServicio = this.listTipoServ;
    });
  }

}
