import { RestService } from '@/app/dashboard/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.css'
})
export class TarifasComponent implements OnInit {

  titulo = ['Tarifas'];
  public listTarifas: any;
  columnas = ['codigo', 'cliente', 'tipo', 'zona', 'valor'];

  vDataSource : any;

  datosConsulta = {
    opc:''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService : RestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    

    this.cargarTarifas();
  }

  cargarTarifas(){
    this.datosConsulta.opc ='TARIFAS';

    this.restService.consultatransporte(this.datosConsulta).subscribe((data: any) => {
      this.listTarifas = data.body[0];
      this.vDataSource = this.listTarifas;
    });
  }

}
