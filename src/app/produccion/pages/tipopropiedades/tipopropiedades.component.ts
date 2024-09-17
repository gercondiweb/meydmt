import { Component, OnInit} from '@angular/core';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tipopropiedades',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tipopropiedades.component.html',
  styleUrl: './tipopropiedades.component.css'
})
export class TipopropiedadesComponent implements OnInit {
  titulo = ['Tipo propiedades'];
  columnas = ['id', 'tipopropiedad'];


  vDataSource!: MatTableDataSource<any,any>;

  consultaTipoPropiedad={
    opc:'TIPOPROPIE',
 
  }

  public listDatos: any;
  public datos: any[] = [];
  constructor(private _prodrestserviceService:ProdrestserviceService){}

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData(){
    this._prodrestserviceService.getTipoPropiedades(this.consultaTipoPropiedad).subscribe(respuesta=>{
      this.listDatos = respuesta;
      //this.datos = this.listDatos.body[0];
      this.vDataSource = this.listDatos.body[0];

      console.log('TIPOPROPIEDADES-CargarData');

      console.log(respuesta);
    })
  }

  editar(){
    alert("Editar tipo de propiedad");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vDataSource.filter = filterValue.trim().toLowerCase();
  }
}