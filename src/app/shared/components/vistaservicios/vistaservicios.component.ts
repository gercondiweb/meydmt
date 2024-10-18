import { Component, Input } from '@angular/core';


interface VehicleStatus {
  time: string; // Formato '08:00'
  available: number;
  occupied: number;
  maintenance: number;
  details: {
    available: string[]; // Lista de placas disponibles
    occupied: string[];  // Lista de placas ocupadas
    maintenance: string[];  // Lista de placas en mantenimiento
  };
}

@Component({
  selector: 'app-vistaservicios',
  templateUrl: './vistaservicios.component.html',
  styleUrl: './vistaservicios.component.css'
})
export class VistaserviciosComponent {
  @Input() vehicleStatuses: VehicleStatus[] = [];

  getColor(status: 'available' | 'occupied' | 'maintenance'): string {
    switch (status) {
      case 'available':
        return 'green';
      case 'occupied':
        return 'red';
      case 'maintenance':
        return 'orange';
      default:
        return 'gray';
    }
  }

  getDetails(vehicles: string[]): string {
    return vehicles.length > 0 ? vehicles.join(', ') : 'No vehicles';
  }
}
