import { Component, OnInit } from '@angular/core';
import { RestService } from '@/app/dashboard/services';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent implements OnInit {

  titulo = ['Administrador de Rutas'];
  columnas = ['cliente', 'nombre', 'hora','origen','destino','zona'];
  vDataSource!: MatTableDataSource<any,any>;

  listRutas : any;

  datosConsulta={
    opc: '',
    vplaca: 0, 
    vID: 0, 
    vid_propietario:0
  }

  formAdm ='admrutas';

  constructor(
    private restService : RestService,
      private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.consultarRutas();
  }

  consultarRutas(){
    this.datosConsulta.opc='RUTAS';
    this.restService.consultatransporte(this.datosConsulta).subscribe((data:any)=>  {
      this.listRutas = data.body[0];
      this.vDataSource = this.listRutas;
    })
  }
}
