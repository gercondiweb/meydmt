import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adm-tipopropiedad',
  standalone: true,
  imports: [SharedModule,CommonModule, RouterModule],
  templateUrl: './adm-tipopropiedad.component.html',
  styleUrl: './adm-tipopropiedad.component.css'
})
export class AdmTipopropiedadComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
   ) { }
closed(){
    this.router.navigateByUrl('/produccion/tipopropiedad');
  }
}
