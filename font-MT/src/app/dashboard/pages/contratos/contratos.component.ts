import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../../services';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { DataSharingService } from '../../services/services/data-sharing.service';

export interface ElementoTabla {
  nombre: string;
}
export interface Contratos {
  contrato: number;
  cliente: string;
  fechainicio: string;
  fechafin: string;
  responsable: string;
}

@Component({
  selector: 'app-contratos',
  standalone: false,
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})
export class ContratosComponent implements OnInit{
  titulo = ['Contratos'];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  clickedRows = new Set<Contratos>();

  columnas: string[] = ['CONTRATO', 'CLIENTE', 'FECHAINICIO', 'FECHAFIN', 'RESPONSABLE'];

  listContratos: any;
  dContratos: any[] = [];

  consultaContratos={
    opc: 'ALL-CON'
  }

  constructor(private restService: RestService,
              private router: Router,
              private dataSharingService: DataSharingService) { }

  ngOnInit(){
    this.cargarContratosActivos();
  }

  cargarContratosActivos(){
    this.restService.getContratos(this.consultaContratos).subscribe((data: any) => {
      this.listContratos = data;
      this.dataSource.data = this.listContratos.body[0];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //clickedRows = new Set<PeriodicElement>();

  crearContrato(){
      this.router.navigateByUrl('/dashboard/admcontratos');
  }

  editarContrato(elemento: ElementoTabla){
    //todo: Aqui debe tomer los datos del contrato seleccionado y enviarlo al admcontratos
    const param1 = 'valor1';
    const param2 = 'valor2';
    const data = { ticket: elemento };

    //console.log(data)

    this.dataSharingService.setParams(param1, param2, data);

    const route = '/dashboard/admcontratos'  ;
    this.router.navigate([route,'editar']);

  }

  mostrarAlerta(fila: Contratos) {
    const mensaje = `Contrato: ${fila.contrato}\nCliente: ${fila.cliente}`;
    alert(mensaje);
  }

}
