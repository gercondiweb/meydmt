import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../services/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

export interface InfoTecnico {
  id: number;
  foto: string;
  numerodocumento: number;
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-adm-tecnicocontrato',
  standalone: false,
  templateUrl: './adm-tecnicocontrato.component.html',
  styleUrl: './adm-tecnicocontrato.component.css'
})
export class AdmTecnicocontratoComponent implements OnInit{
  titulo: string = 'Agregar Tecnicos al Contrato';

  colTecnicos:string[] = ['select', 'foto','numerodocumento','nombre','telefono'];
  lTecnicos:any;
  dsTecnicos = new MatTableDataSource<InfoTecnico>();
  selection = new SelectionModel<InfoTecnico>(true, []);

  constructor(
    public dialogRef: MatDialogRef<AdmTecnicocontratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restService:RestService) {}

  ngOnInit(): void {
    this.cargarTecnicos();
  }

  consultaTec = {
    opc : 'TCN'
  }

  cargarTecnicos() {
    this.restService.getMaestros(this.consultaTec).subscribe(respuesta=>{
    this.lTecnicos = respuesta;
    this.dsTecnicos = this.lTecnicos.body[0];
    //this.dataSource.data = this.listServicios.body[0];

  });

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dsTecnicos.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dsTecnicos.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardarTecnicoCont(){

  }

}
