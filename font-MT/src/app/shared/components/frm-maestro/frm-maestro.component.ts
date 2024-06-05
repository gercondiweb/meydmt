import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface registroSeleccionado {
  nombre: string;
}
@Component({
  selector: 'app-frm-maestro',
  templateUrl: './frm-maestro.component.html',
  styleUrl: './frm-maestro.component.css'
})
export class FrmMaestroComponent implements OnInit{


    @Input() tituloForm:any[]=[];
    //@Input() vDataSource: any[] = [];
    @Input() vDataSource!: MatTableDataSource<any,any>;
    @Input() vColumnas: any[] = [];
    @Input() formAdm: any;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {}

    abrirFormMaestro(){

    }

    crearElemento() {
      // Lógica para editar el elemento
      const route = '/' + this.formAdm + '/'  ;
      this.router.navigate([route]);
    }
}
