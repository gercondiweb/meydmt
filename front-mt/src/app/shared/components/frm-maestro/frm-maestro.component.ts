import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-frm-maestro',
  templateUrl: './frm-maestro.component.html',
  styleUrl: './frm-maestro.component.css'
})
export class FrmMaestroComponent implements OnInit{


    @Input() tituloForm:any[]=[];
    @Input() vDataSource: any[] = [];
    @Input() vColumnas: any[] = [];
    @Input() formAdm: any;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {}

    abrirFormMaestro(){
      
    }
}
