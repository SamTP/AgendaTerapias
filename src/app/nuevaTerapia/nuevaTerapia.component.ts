import { Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nueva-terapia',
  templateUrl: './nuevaTerapia.component.html',
})
export class NuevaTerapiaComponent {
  private paciente: String = null;
  private fecha: Date = null;
  private hora: Time = null;

  private cita = {
    paciente: this.paciente,
    fecha: this.fecha,
    hora: this.hora,
  };
}
