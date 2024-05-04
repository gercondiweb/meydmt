import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent implements OnInit{
  titulo = ['Conductores'];
  public listDatos: any;
 public datos: any[] = [];
 columnas = ['id','nombre','numeroDocumento','celular', 'correo','numeroLicencia','fechaVencimientoLic','activo'];
 
 constructor(private _restService:RestService){}

 ngOnInit(): void {
   this.cargarData();
 }
 
 public cargarData(){
   this._restService.getAllConductores()
   .subscribe(respuesta=>{
     this.listDatos = respuesta;
     this.datos = this.listDatos.body;
   })
 }
}
