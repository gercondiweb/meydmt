import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-secciones',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './secciones.component.html',
  styleUrl: './secciones.component.css'
})
export class SeccionesComponent implements OnInit{
  titulo = ['Secciones'];
  columnas = ['id','id_formato','id_seccion','id_campo','orden','nombrecampo','seccion', 'propiedad', 'tipopropiedad'];


  vDataSource!: MatTableDataSource<any,any>;

  consultaSeccion ={
    opc:'SECCIONES',
  }

  public listDatos: any;
  public datos: any[] = [];
  constructor(private _prodrestserviceService:ProdrestserviceService){}

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData(){
    this._prodrestserviceService.getSeccion(this.consultaSeccion).subscribe(respuesta=>{
      this.listDatos = respuesta;
      //this.datos = this.listDatos.body[0];
      this.vDataSource = this.listDatos.body[0];

      console.log('SECCIONES-CargarData');

      console.log(respuesta);
    })
  }

  editar(){
    alert("Editar sección");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vDataSource.filter = filterValue.trim().toLowerCase();
  }
}