import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../../services/services/rest.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from '../../services/services/data-sharing.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdmEspecialidadComponent } from '../adm-especialidad/adm-especialidad.component';
import { TecnicoEspecialidadComponent } from '../tecnico-especialidad/tecnico-especialidad.component';

@Component({
  selector: 'app-adm-tecnicos',
  standalone: false,
  templateUrl: './adm-tecnicos.component.html',
  styleUrl: './adm-tecnicos.component.css'
})
export class AdmTecnicosComponent implements OnInit{

  public formTecnico !: FormGroup;
  accion : any;
  response : any;

  clienteCreado: number=0;

  activarBotones: boolean = false;

  idTecnico: number=0;

  param1!: string;
  param2!: string;
  objetoData: any;

  columnEspecialidades: string[] = ['id', 'nombre','descripcion'];
  listEspecialidades= new MatTableDataSource<any>();
  vEspecialidad:any;

  consultaEspecialidades={
    opc:'',
    vID:0,
    vIDTECNICO:0,
    vActivo:0

  }

  constructor(
    private dataSharingService: DataSharingService,
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
      apellidos : ['',[Validators.required]],
      numid : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      telefono : ['',[Validators.required]],
      tiposangre : ['',[Validators.required]],
      activo : [1,[Validators.required]],
      foto : ['',[Validators.required]]
    });

    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    if(this.accion === "Editar"){
      this.activarBotones = true;
      this.cargarDatosTecnico()

    }else{
      this.formTecnico.get('id')?.setValue(0);
    }
  }

  cargarDatosTecnico(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();

   console.log('objetoData', this.objetoData)

    this.idTecnico = this.objetoData.data.id;

    this.formTecnico.patchValue({
      numerodocumento: this.objetoData.data.numerodocumento,
      nombre: this.objetoData.data.nombre,
      apellidos: this.objetoData.data.apellidos,
      id: this.objetoData.data.id,
      direccion: this.objetoData.data.direccion,
      email: this.objetoData.data.email,
      telefono: this.objetoData.data.telefono,
      tiposangre: this.objetoData.data.tiposangre,
      foto: this.objetoData.data.foto
    });
//console.log(this.consultaCliente)
  this.cargarEspecialidades();

  }

  async guardarTecnico(){

    try{

      console.log(this.formTecnico.value)
      const res = await lastValueFrom(this.restService.crearTecnicos(this.formTecnico.value));

      this.clienteCreado = res.insertId;

      //console.log(res)
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body + ' - ' +  this.clienteCreado,
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.activarBotones = true;
    }catch( e:any ){
      console.log(e);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 1500
      });
    }

  }

  cargarEspecialidades(){
    //console.log('objetoData', this.objetoData)

    this.consultaEspecialidades.opc='SLC-TCN';
    this.consultaEspecialidades.vIDTECNICO= this.objetoData.data.id;

    this.restService.consultaEspTecnico(this.consultaEspecialidades).subscribe((data: any) => {
      this.vEspecialidad = data.body[0];
      this.listEspecialidades = this.vEspecialidad;
    })
  }


  agregarEspecialidad(){
    const data = this.dataSharingService.getData();

    const dialogRef = this.dialog.open(TecnicoEspecialidadComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        data: data,
      }
    });

    dialogRef.afterClosed().subscribe( (data) => {
      this.vEspecialidad.push(data)
      console.log( this.vEspecialidad)
    });
  }

  agregarDocumento(){

  }

  regresar(){
    this.router.navigateByUrl('/dashboard/tecnicos');
  }

}
