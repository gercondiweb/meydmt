import { RestService } from '@/app/dashboard/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  listClientes: any[];
  listTipoTarifas: any;
  listZonas: any;
  listTipoVehiculos: any;


  datosConsulta={
    opc:'CLI'
  }

  constructor(
      private formBuilder: FormBuilder,
      private restService: RestService,
      private router: Router,
  
  ) { }

  ngOnInit(): void {

    this.formTarifa = this.formBuilder.group({
      id: [0],
      codigo: [''],
      id_cliente: [0],
      id_tipotarifa: [0],
      id_zona: [0],
      id_tipovehiculo:[0],
      origendestino:[''],
      capacidad:[0],
      otro:[0],
      valor:[0],
      costo:[0],
      otrovalor:[0],
      distancia:[0],
      fechavencimiento:[''],
      activa:[1]

    });

    this.cargarMaestros();
    
  }

  cargarMaestros(){

    this.datosConsulta.opc='CLI';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      this.listClientes=respuesta.body[0];
    });

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

  guardarTarifa(){



  }

  regresar(){
    this.router.navigateByUrl('/transporte/tarifas');
  }
  

}
