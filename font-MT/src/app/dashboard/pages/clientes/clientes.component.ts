import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  titulo = ['Clientes **'];
  columnas = ['Id','Cliente','Direccion','Email', 'Telefono','Activo'];
  frmAdmClientes = 'admClientes';

  vDataSource!: MatTableDataSource<any,any>;

  consultaClientes ={
    opc:'CLI'
  }

  public listDatos: any;
  public datos: any[] = [];
  constructor(private _restService:RestService){}

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData(){
    this._restService.getMaestros(this.consultaClientes).subscribe(respuesta=>{
      this.listDatos = respuesta;
      //this.datos = this.listDatos.body[0];
      this.vDataSource = this.listDatos.body[0];

      console.log('CLIENTES-CargarData');

      console.log(respuesta);
    })
  }

  editar(){
    alert("Editar Cliente");
  }
}
