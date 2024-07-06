import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from '../../services';
@Component({
  selector: 'app-masterservicios',
  standalone: false,
  templateUrl: './masterservicios.component.html',
  styleUrl: './masterservicios.component.css'
})
export class MasterserviciosComponent implements OnInit{
    titulo: string[]=["Servicios"];

    colServicios: string[]=["id","Descripcion","observaciones","tiposervicio"];
    dsServicios = new MatTableDataSource<any>();
    vServicio: any;

    listTipoServicio: any;
    lsTipoServicio : any[]= [];

    datosBusquedaMaestro={
      opc: 'SERV'
    }

    constructor(
      private resService: RestService,
    ) { }

    ngOnInit(): void {
        this.getServicios();
    }

    getServicios(){
      this.datosBusquedaMaestro.opc = 'SERV';
      this.resService.getServicios(this.datosBusquedaMaestro).subscribe(respuesta=>{
        this.vServicio=respuesta;
        this.dsServicios=this.vServicio.body[0];
        })
    }
}
