import { Component, OnInit } from '@angular/core';

interface VehicleStatus {
  plate: string;
  status: { [key: string]: string }; // Por ejemplo, { '08:00': 'ocupado', '08:15': 'disponible' }
}


@Component({
  selector: 'app-calendario2',
  templateUrl: './calendario2.component.html',
  styleUrl: './calendario2.component.css'
})
export class Calendario2Component implements OnInit{
  displayedDates: string[] = [];
  displayedColumns: string[] = ['time'];
  vehicleStatusList: VehicleStatus[] = [];
  times: string[] = [];

  ngOnInit(): void {
    this.generateTimeSlots();
    this.loadVehicleData();
  }

  generateTimeSlots() {
    // Generar intervalos de 15 minutos de 00:00 a 23:45
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 45, 0, 0);

    while (start <= end) {
      const timeString = start.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      this.times.push(timeString);
      start.setMinutes(start.getMinutes() + 15);
    }
  }

  loadVehicleData() {
    // Aquí debes cargar la información de los vehículos, ya sea desde un API o un mock
    this.vehicleStatusList = [
      {
        plate: 'ABC123',
        status: {
          '2024-10-15 08:00': 'ocupado',
          '2024-10-15 08:15': 'disponible',
          '2024-10-16 08:00': 'mantenimiento',
        },
      },
      {
        plate: 'DEF456',
        status: {
          '2024-10-15 08:00': 'mantenimiento',
          '2024-10-15 08:15': 'ocupado',
          '2024-10-16 08:00': 'disponible',
        },
      },
      {
        plate: 'GHI789',
        status: {
          '2024-10-15 08:00': 'disponible',
          '2024-10-15 08:15': 'ocupado',
          '2024-10-16 08:00': 'ocupado',
        },
      },
    ];

    // Simular selección de rango de fechas (puedes reemplazarlo con un selector de fechas)
    this.displayedDates = this.getDatesInRange('2024-10-15', '2024-10-17');
    this.displayedColumns = ['time', ...this.displayedDates];
  }

  getDatesInRange(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split('T')[0]); // Guardar en formato 'YYYY-MM-DD'
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'ocupado':
        return '#FF0000'; // Rojo
      case 'disponible':
        return '#00FF00'; // Verde
      case 'mantenimiento':
        return '#0000FF'; // Azul
      default:
        return '#CCCCCC'; // Gris para estados desconocidos
    }
  }

  getVehicleCountForStatus(date: string, time: string, status: string): number {
    // Contar la cantidad de vehículos que tienen un estado específico en una fecha y hora
    return this.vehicleStatusList.filter(
      (vehicle) => vehicle.status[date + ' ' + time] === status
    ).length;
  }

}
