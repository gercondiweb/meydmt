import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

export interface Seccion1 {
  id: number;
  nombre: string;
}

export interface Campo1 {
  idcampo: number;
  nombre: string;
  id_propiedad: number;
  propiedades: Propiedad[];
}

export interface Propiedad {
  id: number;
  nombre: string;
  tipo: 'texto' | 'numero'; // otros tipos si los necesitas
}

@Component({
  selector: 'app-tableroprod',
  templateUrl: './tableroprod.component.html',
  styleUrls: ['./tableroprod.component.css']
})
export class TableroprodComponent implements OnInit {

  secciones: Seccion1[] = [
    { id: 1, nombre: 'Sección 1' },
    { id: 2, nombre: 'Sección 2' }
  ];

  campos: Campo1[] = [
    {
      idcampo: 1, nombre: 'Campo 1', id_propiedad: 1, propiedades: [
        { id: 1, nombre: 'Dirección', tipo: 'texto' },
        { id: 2, nombre: 'Teléfono', tipo: 'numero' }
      ]
    },
    {
      idcampo: 2, nombre: 'Campo 2', id_propiedad: 2, propiedades: [
        { id: 3, nombre: 'Edad', tipo: 'numero' }
      ]
    }
  ];

  formulario: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generarFormulario();
  }

  generarFormulario() {
    // Recorremos los campos y agregamos sus propiedades al formulario
    this.campos.forEach(campo => {
      console.log('propiedad -->' ,  campo.propiedades)
      campo.propiedades.forEach(propiedad => {
        this.formulario.addControl(propiedad.nombre, this.crearControl(propiedad));
      });
    });
  }

  crearControl(propiedad: Propiedad) {
    const validators = [];
    if (propiedad.tipo === 'numero') {
      validators.push(Validators.pattern(/^[0-9]+$/)); // Validación solo números
    }
    return this.fb.control('', validators);
  }

  enviarDatos() {
    if (this.formulario.valid) {
      const valoresFormulario = this.formulario.value;

      console.log(valoresFormulario);
  
      // Estructuramos los datos en el formato deseado
      const resultado = this.campos.map(campo => {
        return campo.propiedades.map(propiedad => {
          return {
            idcampo: campo.idcampo,
            idpropiedad: propiedad.id,
            valor: valoresFormulario[propiedad.nombre] // El valor ingresado por el usuario
          };
        });
      }).flat(); // Aplanamos el arreglo de arreglos
  
      console.log('Datos a enviar:', JSON.stringify(resultado));
  
      // Enviar a la API
      
    }
  }

}
