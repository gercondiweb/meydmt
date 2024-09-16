import { Component } from '@angular/core';
import { RestService } from '../../services/services/rest.service';
import { DataSharingService } from '../../services/services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent {
  titulo =['Administrar Tipos de Sucursales'];
  colTipoServicio = ['id', 'nombre', 'direccion','telefono', 'id_cliente'];

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
    this.cargarSucursales();
  }

  cargarSucursales() {
    this.consultaTS.opc = 'SUCUR';
    this.restService.getMaestros(this.consultaTS).subscribe((data: any) => {
      this.listTipoServ = data.body[0];
      this.vTipoServicio = this.listTipoServ;
    });
  }

}
