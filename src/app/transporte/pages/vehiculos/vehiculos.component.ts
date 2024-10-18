import { RestService } from '@/app/transporte/services/rest.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit {

  titulo :any[] = ['Vehiculos Registrados'];
  vDataSource!: MatTableDataSource<any,any>;
  columnas =['id','placa', 'tipo','capacidad', 'id_estado', 'proveedor', 'activo'];

  listVehiculos: any[];
  vVehiculos:any;

  datosConsulta={
    opc: 'ALL',
    vplaca: 0,
    vID: 0,
    vid_propietario:0
  }

  constructor(
      private restService : RestService,
      private route : ActivatedRoute
      ){}

  ngOnInit(): void {
    this.consultarVehiculos();
  }

  consultarVehiculos(){
    this.datosConsulta.opc='ALL';
    this.restService.consultatransporte(this.datosConsulta).subscribe((data:any)=>  {
      this.vVehiculos = data.body[0];
      this.vDataSource = this.vVehiculos;
    }) 
  }

}
