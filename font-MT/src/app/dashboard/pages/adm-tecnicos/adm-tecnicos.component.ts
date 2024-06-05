import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../../services/services/rest.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adm-tecnicos',
  standalone: false,
  templateUrl: './adm-tecnicos.component.html',
  styleUrl: './adm-tecnicos.component.css'
})
export class AdmTecnicosComponent implements OnInit{

  public formTecnico !: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.formTecnico = this.formBuilder.group({
      numerodocumento : ['',[Validators.required]],
      nombre : ['',[Validators.required]],
      apellido : ['',[Validators.required]],
      numid : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      telefono : ['',[Validators.required]],
      tiposangre : ['',[Validators.required]],
      activo : [1,[Validators.required]],
      foto : ['',[Validators.required]]
    });
  }

  guardarTecnico(){

  }

  agregarEspecialidad(){

  }

  regresar(){
    this.router.navigateByUrl('/dashboard/clientes');
  }

}
