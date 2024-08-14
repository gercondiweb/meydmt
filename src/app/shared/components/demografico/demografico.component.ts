import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { DataSharingService } from '@/app/dashboard/services';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-demografico',
  templateUrl: './demografico.component.html',
  styleUrls: ['./demografico.component.css']
})
export class DemograficoComponent implements OnInit {

  @Input() iPais : number;
  @Input() iDepartamento : number;
  @Input() iCiudad : number;
  @Input() iZip : number;
  @Input() iAccion: string;

  @Output() isValid = new EventEmitter<boolean>();

  selectedCountry: number = 0;
  selectedDepartment: number = 0;
  selectedCity: number = 0;
  selectedZip:number = 0;

  countries: any;
  departments: any;
  cities: any;

  constructor(
    private RestService:RestService,
    private DatosDemog : DataSharingService
  ) { }

  async ngOnInit() {
    this.cargarDatos();

    if(this.iAccion === 'Editar'){
      console.log('Entre')
      this.selectedCountry = this.iPais;
      await this.onCountryChange(this.iPais);
      this.selectedDepartment = this.iDepartamento;
      await this.onDepartmentChange(this.iDepartamento);
      this.selectedCity = this.iCiudad;
      this.selectedZip = this.iZip;
    }
  }

  consultaDemografico={
    opc: '',
    COD:0,
    NOMBRE:''
  }

  cargarDatos(){
    this.consultaDemografico.opc = 'PAIS';

    this.RestService.demografico(this.consultaDemografico).subscribe(
      (data: any) => {
        this.countries = data.body[0];
        console.log(data)
      }
    );


  }

  async onCountryChange(idDepart: any) {
    console.log(idDepart);
    const selectedValue = idDepart;
    this.selectedCountry = selectedValue;

    this.consultaDemografico.opc = 'DEPA';
    this.consultaDemografico.COD = selectedValue;
    await lastValueFrom(
      this.RestService.demografico(this.consultaDemografico)
      .pipe(
        map( ({ body }) =>  this.departments = body[0])
      ));

  }

  async onDepartmentChange(idPais: any) {

    const selectedValue = idPais;
    this.selectedDepartment = selectedValue;

    this.consultaDemografico.opc = 'CIUD';
    this.consultaDemografico.COD = selectedValue;
    await lastValueFrom(
      this.RestService.demografico(this.consultaDemografico)
      .pipe(
        map( ({ body }) =>  this.cities = body[0])
      ));

  }

  onCityChange(idDepart: any) {

    const selectedValue = idDepart.target.value;
    this.selectedCity = selectedValue;

  }

  onZipChange(idZip: any) {

    const selectedValue = idZip.target.value;
    this.selectedZip = selectedValue;

    if(this.selectedCountry && this.selectedDepartment && this.selectedCity && this.selectedZip){
      this.isValid.emit(true);
    }else{
      this.isValid.emit(false);
    }
    this.DatosDemog.setDemografico(this.selectedCountry, this.selectedDepartment, this.selectedCity, this.selectedZip);

  }

}
