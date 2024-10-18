import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admgastos',
  templateUrl: './admgastos.component.html',
  styleUrl: './admgastos.component.css'
})
export class AdmgastosComponent implements OnInit{

  formGasto : FormGroup;

  listConcepto:any;
  listVehiculo:any;
  listTipoGastos:any;

  constructor(
    public dialogRef: MatDialogRef<AdmgastosComponent>,
    private fb : FormBuilder
  ){}

  ngOnInit(): void {
    const fechaInicio = new Date();

      this.formGasto = this.fb.group({
        id: [0],
        id_tipogasto: [0],
        fecha:[fechaInicio.toISOString().substring(0, 10)],
        id_vehiculo: [0],
        id_servicio: [0],
        descripcion: [''],
        valor: [0]
      });
  }

  grabar(){}

  cancelar(){
    this.dialogRef.close();
  }
}
