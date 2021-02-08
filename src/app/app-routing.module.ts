import {
  NgModule,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './mainPage/mainPage.component';
import { NuevaTerapiaComponent } from './nuevaTerapia/nuevaTerapia.component';
import { NuevoPacienteComponent } from './nuevoPaciente/nuevoPaciente.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'nueva', component: NuevaTerapiaComponent },
  { path: 'nuevoPaciente', component: NuevoPacienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
