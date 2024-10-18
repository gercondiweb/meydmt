import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { lastValueFrom } from 'rxjs';

interface Vehicle {
  plate: string;
  status: { [time: string]: 'ocupado' | 'disponible' | 'mantenimiento' };
}

interface Vehiculo{
  id_vehiculo: number;
  placa: string;
  estado: { [time: string]: 'ASG' | 'INI' | 'MTO' };
}

interface VehicleStatus {
  plate: string;
  status: 'ocupado' | 'disponible' | 'mantenimiento';
  time: string;
}

interface estadoVehiculos {
  id_vehiculo: number;
  placa: string;
  estado: 'ASG' | 'INI' | 'MTO';
  time: string;
}

@Component({
  selector: 'app-calendario1',
  templateUrl: './calendario1.component.html',
  styleUrl: './calendario1.component.css'
})
export class Calendario1Component implements OnInit{

  timeSlots: string[] = [];
  vehicles: Vehiculo[] = [];

  datosConsulta={
    opc:'',
    vID: 0,
    vFechaInicio: ''
  }

  constructor(
    private restService: RestService
  ) {
    this.initializeTimeSlots();
    this.initializeVehicles();
  }

  ngOnInit(): void {
    console.log('ANTES vehicles', this.vehicles )
    this.cargarServicios()
    console.log('DESPUES vehicles', this.vehicles )
  }

  async cargarServicios(){
    this.datosConsulta.opc='SERPLAHORA';
    this.datosConsulta.vFechaInicio=new Date().toISOString().substring(0, 10);
    const serviciosHora= await lastValueFrom(this.restService.consultatransporte(this.datosConsulta));

    this.vehicles = serviciosHora.body[0]
    console.log('cargar Servicio: ',this.vehicles);

  }

  // Genera los intervalos de 15 minutos para un día
  initializeTimeSlots() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    while (start <= end) {
      this.timeSlots.push(this.formatTime(start));
      start.setMinutes(start.getMinutes() + 15);
    }
  }

  // Simulación de datos de vehículos y su estado por cada intervalo de tiempo
  initializeVehicles() {
    //this.cargarServicios();
    console.log('vehicles', this.vehicles )

    this.vehicles = [
      {
        id_vehiculo:3,
        placa: 'EGN918',
        estado: {
          '19:00': 'MTO',
          '19:15': 'INI',
          '19:30': 'INI',
          // Más horarios y estados...
        }
      },
      {
        id_vehiculo:2,
        placa: 'EGN917',
        estado: {
          '09:00': 'MTO',
          '09:15': 'INI',
          '09:30': 'INI',
          // Más horarios y estados...
        }
      },
      {
        id_vehiculo:1,
        placa: 'EGN916',
        estado: {
          '08:00': 'MTO',
          '08:15': 'INI',
          '08:30': 'ASG',
          // Más horarios y estados...
        }
      },
      // Agrega más vehículos si es necesario...
    ];
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getStatusColor(status: 'INI' | 'ASG' | 'MTO' | undefined): string {
    switch (status) {
      case 'INI': return '#FF6347'; // Rojo
      case 'MTO': return '#FFD700'; // Amarillo
      default: return '#32CD32'; // Gris claro para intervalos sin estado definido
    }
  }
  agregarServicio(){

  }


}
