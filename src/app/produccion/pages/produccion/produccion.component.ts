import { DataSharingService } from '@/app/dashboard/services/services/data-sharing.service';
import { RestService } from '@/app/dashboard/services/services/rest.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProdrestserviceService } from '../../services/prodrestservice.service';

export interface Ordenes {
  id: number;
  OIT: string;
  cliente: string;
  fechaentrada: string;
  fechaautoriza: string;
  usuariorecibecampo: string;
}

export interface ElementoOrden {
  nombre: string;
}

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {

  title: string[] = ['Ordenes de Trabajo'];
  urlAdm : string ='/produccion/admproduccion';

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  clickedRows = new Set<Ordenes>();

  columns: string[] = ['id', 'OIT', 'cliente', 'fechaentrada', 'fechaautoriza', 'usuariorecibecampo'];

  listOrdenes: any;
  dOrdenes: any[] = [];

  consultaOrdenes={
    opc: 'ALL',
    vID: 0,
    vIDSECCION: 0
  }

  constructor(private restService: ProdrestserviceService,
    private router: Router,
    private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.cargarordenes();
  }

  cargarordenes(){

      this.restService.getOrdenes(this.consultaOrdenes).subscribe((data: any) => {
      this.listOrdenes = data;
      this.dataSource = this.listOrdenes.body[0];
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearContrato(){
    this.router.navigateByUrl('/produccion/admproduccion');
}

editarOIT(elemento: ElementoOrden){
  //todo: Aqui debe tomer los datos del contrato seleccionado y enviarlo al admcontratos
  const param1 = 'valor1';
  const param2 = 'valor2';
  const data = { ticket: elemento };

  //console.log(data)

  this.dataSharingService.setParams(param1, param2, data);

  const route = '/produccion/admproduccion'  ;
  this.router.navigate([route,'editar']);

}

}
