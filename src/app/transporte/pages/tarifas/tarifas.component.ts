import { RestService } from '@/app/transporte/services/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModaltarifaComponent } from '../modaltarifa/modaltarifa.component';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.css'
})
export class TarifasComponent implements OnInit {

  titulo = ['Tarifas del Cliente'];
  public listTarifas: any;
  columnas = ['codigo', 'cliente', 'tipo', 'zona', 'valor'];
  formAdm = '/transporte/admtarifas';

  vDataSource : any;

  datosConsulta = {
    opc:'',
    vID:0
  }

  listClientes : any;
  listTipoTarifas : any;

  idCliente:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService : RestService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dataSharing : DataSharingService
  ) { }
  ngOnInit(): void {
    
    this.cargarMaestros();
    //this.cargarTarifas();
  }

  cargarMaestros(){
    this.datosConsulta.opc ='CLI';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listClientes=respuesta.body[0];
    });

    this.datosConsulta.opc ='TIPOTAR';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listTipoTarifas=respuesta.body[0];
    });
  }

  cargarTarifas(event: any){
    console.log('Seleccion Cliente ',event.target.value)

    this.idCliente = event.target.value;
   
    this.datosConsulta.opc ='TARIFAS';
    this.datosConsulta.vID = this.idCliente;

    this.restService.consultatransporte(this.datosConsulta).subscribe((data: any) => {
      this.listTarifas = data.body[0];
      this.vDataSource = this.listTarifas;
    });
  }

  crearTarifasCliente(){
    const route = '/' + this.formAdm + '/'  ;
    this.router.navigate([route,this.idCliente]);
  }

  editarTarifa(element: any){
    const data = this.dataSharing.getData();

    const dialogRef = this.dialog.open(ModaltarifaComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        data: data
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(`Dialog result: ${result}`);
        this.listTarifas.push(result);
      }
    });
  }

  eliminarTarifa(element:any){
    
  }

}
