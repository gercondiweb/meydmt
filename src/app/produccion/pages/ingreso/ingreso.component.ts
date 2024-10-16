import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { ProdrestserviceService } from '../../services/prodrestservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent implements OnInit{

  datosFormato ={
    opc:''
  }
  consecutivoOit: any;
  response:any;

  frmOrden : FormGroup;

  lClientes : any;
  lFormatos : any;
  lPrioridad: any;

  constructor(private restService : ProdrestserviceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.frmOrden = this.fb.group({
      OIT: [''],
      fechaentrada: [moment().format('YYYY-MM-DD')],
      horaentrada: [moment().format('HH:mm')],
      id_cliente: [0],
      autoriza:[''],
      correo:[''],
      celular:[''],
      usuarioentregacampo:[''],
      usuarioentregataller:[''],
      usuariorecibecampo:[''],
      usuariorecibetaller:[''],
      id_equipo:[0],
      solicitud:[''],
      id_formato:[0],
      estado:['REC'],
      tag:[''],
      ubicacion:[''],
      descripcion:[''],
      equipo:[''],
      id_prioridad:['']
    })

    this.crearOIT();

    this.getMaestros();
    
  }

  getMaestros(){
    this.datosFormato.opc='CLI';
    this.restService.getMaestros(this.datosFormato).subscribe(respuesta=>{
      this.lClientes=respuesta.body[0];
    })

    this.datosFormato.opc='FORMATOS';
    this.restService.getMaestros(this.datosFormato).subscribe(respuesta=>{
      this.lFormatos=respuesta.body[0];
    })

    this.datosFormato.opc='PRIOR';
    this.restService.getMaestros(this.datosFormato).subscribe(respuesta=>{
      this.lPrioridad=respuesta.body[0];
    })
  }

  async crearOIT(){
    this.datosFormato.opc='LAST-CONSECUT';
    const idorden = await lastValueFrom(this.restService.getOrdenes(this.datosFormato));

    console.log(idorden);

    let numero = idorden.body[0][0].id + 1;

    numero = numero.toString().padStart(4,'0');

    const mesActual= moment().format('MM');
    const anioActual=moment().format('YYYY');

    console.log(numero);

    this.consecutivoOit = `${numero}-${mesActual}-${anioActual}`;

    this.frmOrden.get('OIT').setValue(this.consecutivoOit);
    //this.frmOrden.get('OIT').disable();

    this.frmOrden.get('estado').setValue('REC');
    this.frmOrden.get('fechaentrada').setValue(moment().format('YYYY-MM-DD'));
    this.frmOrden.get('horaentrada').setValue(moment().format('HH:mm'));
  }

  async guardarCabecera(){
    //this.frmOrden.get('OIT').setValue(this.consecutivoOit);

    console.log('FORM',this.frmOrden.value)
    
    try{
      const res = await lastValueFrom(this.restService.saveOrden(this.frmOrden.value));
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body + ' - ' +  this.consecutivoOit,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }catch( e:any ){
      console.log(e);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 1500
      });
    }

  }



}
