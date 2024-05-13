import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-frmdinamicmodal',
  standalone: false,
  templateUrl: './frmdinamicmodal.component.html',
  styleUrl: './frmdinamicmodal.component.css'
})
export class FrmdinamicmodalComponent implements OnInit {

  @Input() titulo !: any;
  @Input() columnas: any[] = [];

  @Input() dataSource!: MatTableDataSource<any,any>;

  ngOnInit(): void {
      if (this.data.tipo === 'Buscar'){
        this.dataSource = this.data.vDataSource;
      }
  }

  constructor(
    public dialogRef: MatDialogRef<FrmdinamicmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  cancelar() {
    this.dialogRef.close();
  }

  seleccionar(){

  }



}
