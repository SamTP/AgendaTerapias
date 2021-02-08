import { BrowserModule } from '@angular/platform-browser';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { NuevaTerapiaComponent } from './nuevaTerapia/nuevaTerapia.component';
import { NuevoPacienteComponent } from './nuevoPaciente/nuevoPaciente.component';

@NgModule({
  declarations: [AppComponent,MainPageComponent,NuevaTerapiaComponent,NuevoPacienteComponent],
  imports: [BrowserModule, AppRoutingModule, OnsenModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
