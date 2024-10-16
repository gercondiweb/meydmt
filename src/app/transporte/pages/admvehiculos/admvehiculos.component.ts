import { DataSharingService } from '@/app/dashboard/services/services/data-sharing.service';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdmdocumentosComponent } from '../admdocumentos/admdocumentos.component';
import { RestService } from '../../services/rest.service';
import { AnyMxRecord } from 'dns';

@Component({
  selector: 'app-admvehiculos',
  templateUrl: './admvehiculos.component.html',
  styleUrl: './admvehiculos.component.css'
})
export class AdmvehiculosComponent implements OnInit{

  formVehiculo !: FormGroup;

  dVehiculo: any;

  placaExiste: boolean;

  componente = AdmdocumentosComponent;

  accion:any;
  response: any;
  registroGuardado: boolean = false;

  datosConsulta={
    opc:'VEHICULO',
    vplaca: '',
    vID:0,
    vid_propietario:0
  }

  datosMaestro={
    opc:''
  }

  listTipoVehi : any; vTipoVehi : any[];

  listEstados : any; vEstados : any[];

  listPropie : any; vPropie : any[];

  listDocV : any; vDocV : any[];
  columnDocs = ['documento', 'numerodoc', 'fechaexpedido','fechavence'];

  constructor(
    private formBuilder: FormBuilder,
    private restService:RestService,
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.formVehiculo=this.formBuilder.group({
      id:[0,[Validators.required]],
      placa:['', [Validators.required]],
      capacidad:[0],
      id_estado:[''],
      id_proveedor:[0],
      activo:[1],
      id_tipovehiculo:[0],
      marca:[''],
      linea:[''],
      modelo:['']
    });

    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.cargarMaestros();

    if(this.accion === 'Editar'){
      this.cargarDatos();
      this.buscarDocs();
    }else{
      this.formVehiculo.get('id')?.setValue(0);
      this.formVehiculo.get('activo')?.setValue(1);
    }
  }

  cargarMaestros(){
    this.datosMaestro.opc ='TIPOVEHI';

    this.restService.getMaestros(this.datosMaestro).subscribe((rta: any) => {
      this.vTipoVehi = rta.body[0];
      this.listTipoVehi = this.vTipoVehi;
    })

    this.datosMaestro.opc ='ESTVEHI';

    this.restService.getMaestros(this.datosMaestro).subscribe((rta: any) => {
      this.vEstados = rta.body[0];
      this.listEstados = this.vEstados;
    })

    this.datosMaestro.opc ='PROPIETA';

    this.restService.getMaestros(this.datosMaestro).subscribe((rta: any) => {
      this.vPropie = rta.body[0];
      this.listPropie = this.vPropie;
    })

  }

  cargarDatos(){
    this.dVehiculo = this.dataSharingService.getData();
      //console.log('DATOS: ',this.dVehiculo);

      this.formVehiculo.patchValue({
        id: this.dVehiculo.data.id,
        placa: this.dVehiculo.data.placa,
        capacidad: this.dVehiculo.data.capacidad,
        id_estado: this.dVehiculo.data.id_estado,
        id_proveedor: this.dVehiculo.data.id_proveedor,
        activo: this.dVehiculo.data.activo,
        id_tipovehiculo: this.dVehiculo.data.id_tipovehiculo,
        marca: this.dVehiculo.data.marca,
        linea: this.dVehiculo.data.linea,
        modelo: this.dVehiculo.data.modelo
      });

      
  }

  buscarDocs(){
    //buscamos los documentos del vehiculo y los mostramos en una tabla
    this.datosConsulta.opc ='DOCS';
    this.datosConsulta.vID = this.dVehiculo.data.id;

    this.restService.consultatransporte(this.datosConsulta).subscribe((rta: any) => {
      this.vDocV = rta.body[0];
      this.listDocV = this.vDocV;
    })
   /*    this.restService.consultatransporte(this.datosConsulta).subscribe((rta: any) => {
        this.vDocV = rta.body[0];
        this.listDocV = this.vDocV;
      }) */
  }

  async guardarVehiculo(){

        const res = await lastValueFrom(this.restService.vehiculos(this.formVehiculo.value));

        this.response = res;
        if(!this.response.error){
          await Swal.fire({
            position: "center",
            icon: "success",
            title: this.response.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.registroGuardado = true;
          this.formVehiculo.get('placa').disable();
        }
      
  }

  validarPlaca(){

  }

  agregarFoto(){

  }

  agregarDocumento(elemento:any){
    //mostrar modal para agregar documento
    const dialogRef = this.dialog.open(AdmdocumentosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        id_vehiculo: this.formVehiculo.get('id')?.value,
        data: elemento,
      }
    });

    dialogRef.afterClosed().subscribe( (data2) => {
      this.listDocV.push(data2)
      console.log(data2);

      this.listDocV=[];
      this.buscarDocs();
    });
  }

  regresar(){
    this.router.navigateByUrl('/transporte/vehiculos');
  }

}
