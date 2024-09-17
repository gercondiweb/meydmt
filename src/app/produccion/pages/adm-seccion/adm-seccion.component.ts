import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adm-seccion',
  standalone: true,
  imports: [SharedModule,CommonModule, RouterModule],
  templateUrl: './adm-seccion.component.html',
  styleUrl: './adm-seccion.component.css'
})
export class AdmSeccionComponent {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
   ) { }
closed(){
    this.router.navigateByUrl('/produccion/secciones');
  }
  
}
