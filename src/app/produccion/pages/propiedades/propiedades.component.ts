import { Component, OnInit} from '@angular/core';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.css'
})
export class PropiedadesComponent implements OnInit {
  titulo = ['Propiedades'];
  columnas = ['id','id_formato','id_seccion','id_campo','orden','nombrecampo','seccion', 'propiedad', 'tipopropiedad'];


  vDataSource!: MatTableDataSource<any,any>;

  consultaPropiedad={
    opc:'TIPOPROPIEDAD',
 
  }

  public listDatos: any;
  public datos: any[] = [];
  constructor(private _prodrestserviceService:ProdrestserviceService){}

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData(){
    this._prodrestserviceService.getPropiedades(this.consultaPropiedad).subscribe(respuesta=>{
      this.listDatos = respuesta;
      //this.datos = this.listDatos.body[0];
      this.vDataSource = this.listDatos.body[0];

      console.log('PROPIEDADES-CargarData');

      console.log(respuesta);
    })
  }

  editar(){
    alert("Editar Propiedad");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vDataSource.filter = filterValue.trim().toLowerCase();
  }
}
