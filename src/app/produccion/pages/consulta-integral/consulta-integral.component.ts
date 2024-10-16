import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { lastValueFrom } from 'rxjs';
import { ModalFormComponent } from '../../../shared/components/modal-form/modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdrestserviceService } from './../../services/prodrestservice.service';


@Component({
  selector: 'app-consulta-integral',
  templateUrl: './consulta-integral.component.html',
  styleUrl: './consulta-integral.component.css'
})
export class ConsultaIntegralComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private  ProdrestserviceService : ProdrestserviceService,
    private _prodrestserviceService:ProdrestserviceService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ){
  }

  cards: any[] = [
    { title: 'Activos', icon: 'commute', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Cancelados', icon: 'cancel', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' },
    { title: 'Eliminados', icon: 'done', value: 0, cols: 1, rows: 1, ischarts: false, tipo: '' }
    ];

  ngOnInit(): void {
    

  }



  public filtrar(estado:any){
    alert('Se va a filtrar algo..');
  }

 
}
