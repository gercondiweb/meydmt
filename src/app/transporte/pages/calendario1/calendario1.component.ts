import { Component } from '@angular/core';

interface Vehicle {
  plate: string;
  status: { [time: string]: 'ocupado' | 'disponible' | 'mantenimiento' };
}

interface VehicleStatus {
  plate: string;
  status: 'ocupado' | 'disponible' | 'mantenimiento';
  time: string;
}

@Component({
  selector: 'app-calendario1',
  templateUrl: './calendario1.component.html',
  styleUrl: './calendario1.component.css'
})
export class Calendario1Component {

  timeSlots: string[] = [];
  vehicles: Vehicle[] = [];

  constructor() {
    this.initializeTimeSlots();
    this.initializeVehicles();
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
    this.vehicles = [
      {
        plate: 'ABC123',
        status: {
          '08:00': 'disponible',
          '08:15': 'ocupado',
          '08:30': 'mantenimiento',
          // Más horarios y estados...
        }
      },
      {
        plate: 'DEF456',
        status: {
          '08:00': 'ocupado',
          '08:15': 'disponible',
          '08:30': 'ocupado',
          // Más horarios y estados...
        }
      },
      {
        plate: 'GHI789',
        status: {
          '08:00': 'mantenimiento',
          '08:15': 'ocupado',
          '08:30': 'disponible',
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

  getStatusColor(status: 'ocupado' | 'disponible' | 'mantenimiento' | undefined): string {
    switch (status) {
      case 'ocupado': return '#FF6347'; // Rojo
      case 'disponible': return '#32CD32'; // Verde
      case 'mantenimiento': return '#FFD700'; // Amarillo
      default: return '#E0E0E0'; // Gris claro para intervalos sin estado definido
    }
  }
  agregarServicio(){

  }


}
