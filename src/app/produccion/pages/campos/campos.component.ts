import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-campos',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './campos.component.html',
  styleUrl: './campos.component.css'
})
export class CamposComponent implements OnInit{
  titulo = ['Campos'];
  columnas = ['id','nombrecampo','propiedades'];


  vDataSource!: MatTableDataSource<any,any>;

  consultaCampo ={
    opc:'CAMPOPROP',
  }

  public listDatos: any;
  public datos: any[] = [];
  constructor(private _prodrestserviceService:ProdrestserviceService){}

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData(){
    this._prodrestserviceService.getMaestros(this.consultaCampo).subscribe(respuesta=>{
      this.listDatos = respuesta;
      //this.datos = this.listDatos.body[0];
      this.vDataSource = this.listDatos.body[0];

      console.log('CAMPOS-CargarData');

      console.log(respuesta);
    })
  }

  editar(){
    alert("Editar campo");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vDataSource.filter = filterValue.trim().toLowerCase();
  }
}



