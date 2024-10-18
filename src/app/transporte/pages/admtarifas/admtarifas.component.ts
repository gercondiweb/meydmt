import { DataSharingService } from '@/app/dashboard/services/services/data-sharing.service';
import { RestService } from '@/app/transporte/services/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ModaltarifaComponent } from '../modaltarifa/modaltarifa.component';
import { MatDialog } from '@angular/material/dialog';

interface Field {
  name: string;
}

interface Property {
  name: string;
}

interface Combination {
  field: Field;
  property: Property;
}

@Component({
  selector: 'app-admtarifas',
  templateUrl: './admtarifas.component.html',
  styleUrl: './admtarifas.component.css'
})
export class AdmtarifasComponent implements OnInit {

  formTarifa : FormGroup;
  formAdm ='modaltarifa';

  columnas = ['tipo', 'vehiculo', 'capacidad','origen','zona','valor', 'costo'];

  listClientes: any[];
  listTipoTarifas: any;
  listZonas: any;
  listTipoVehiculos: any;
  listTarifas:any;

  idCli:any;

  datosConsulta={
    opc:'CLI',
    vID:0
  }

  constructor(
      private formBuilder: FormBuilder,
      private restService: RestService,
      private router: Router,
      private route : ActivatedRoute,
      private dataSharing: DataSharingService,
      private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.formTarifa = this.formBuilder.group({
      id: [0],
      codigo: [''],
      id_cliente: [{value: 0, disabled:true}],
      id_tipotarifa: [{value: 0}],
      id_zona: [0],
      id_tipovehiculo:[0],
      origendestino:[''],
      capacidad:[0],
      otro:[0],
      valor:[0],
      costo:[0],
      otrovalor:[0],
      distancia:[0],
      fechavencimiento:['2099-12-31'],
      activa:[1]

    });

    this.idCli = this.route.snapshot.paramMap.get('accion') || '';
//alert(this.idCli);
    this.cargarMaestros();
    this.cargarTarifasCli(this.idCli)
    
  }

  cargarTarifasCli(idCli: any){

    this.datosConsulta.opc ='TARIFAS';
    this.datosConsulta.vID = idCli;

    this.restService.consultatransporte(this.datosConsulta).subscribe((data: any) => {
      this.listTarifas = data.body[0];
      //this.vDataSource = this.listTarifas;
    });

  }

  cargarMaestros(){

    this.datosConsulta.opc='CLI';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listClientes=respuesta.body[0];
    });

    this.formTarifa.get('id_cliente').setValue(this.idCli);

    this.datosConsulta.opc='TIPOTAR';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listTipoTarifas=respuesta.body[0];
    });

    this.datosConsulta.opc='ZONA';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listZonas=respuesta.body[0];
    });

    this.datosConsulta.opc='TIPOVEHI';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listTipoVehiculos=respuesta.body[0];
    });
  }

  async agregarTarifa(){
    this.formTarifa.get('id_cliente').enable();
    const newtarifa= await lastValueFrom(this.restService.getTarifas(this.formTarifa.value));
    this.formTarifa.get('id_cliente').disable();
    console.log(newtarifa.body);

    this.listTarifas.push(newtarifa.data.body);

  }

  guardarTarifa(){
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

  regresar(){
    this.router.navigateByUrl('/transporte/tarifas');
  }
  

}
