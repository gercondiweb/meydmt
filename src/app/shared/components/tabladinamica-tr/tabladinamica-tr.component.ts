import { Component, Input, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingService } from '../../../dashboard/services/services/data-sharing.service';
import { AdmgastosComponent } from '@/app/transporte/pages/admgastos/admgastos.component';
import { AdmdocumentosComponent } from '@/app/transporte/pages/admdocumentos/admdocumentos.component';
import { MatDialog } from '@angular/material/dialog';

export interface ElementoTabla {
  nombre: string;
}

@Component({
  selector: 'app-tabladinamica-tr',
  templateUrl: './tabladinamica-tr.component.html',
  styleUrl: './tabladinamica-tr.component.css'
})
export class TabladinamicaTrComponent {
 //@Input() dataSource: any[] = [];
 @Input() dataSource!: MatTableDataSource<any,any>;
 @Input() columnas: any[] = [];
 @Input() formMaestro: any;
 @Input() filtro : boolean = true;
 @Input() manejaDoc : boolean = false;
 @Input() manejaGastos : boolean = true;
 @Input() esDialogo : boolean = false;
 @Input() admDialogo: Type<any>;

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 constructor(private route: ActivatedRoute,
             private router: Router,
             private dataSharingService: DataSharingService,
             private dialog: MatDialog){}

 editarElemento(elemento: ElementoTabla) {
   // Lógica para editar el elemento
   const param1 = 'valor1';
   const param2 = 'valor2';
   const data = { data: elemento };

   console.log(data)

   this.dataSharingService.setParams(param1, param2, data);

   if(this.esDialogo){

    const dialogRef = this.dialog.open(this.admDialogo, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'EDITAR',
        data: elemento,
      }
    });


   }else{

   const route = '/' + this.formMaestro + '/';
   this.router.navigate([route,'Editar']);
  }

   console.log('Editar:', elemento);
 }

 eliminarElemento(elemento: ElementoTabla) {
   // Lógica para eliminar el elemento
   console.log('Eliminar:', elemento);
 }
}
