import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { HttpClientModule} from '@angular/common/http';
import { PacienteService} from './paciente/paciente.service';
import { FormularioComponent } from './paciente/formulario.component';
import { FormsModule } from '@angular/forms';
import { FichaComponent } from './paciente/ficha/ficha.component';
import { LoginComponent } from './usuarios/login.component';



const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pacientes', component: PacienteComponent},
  {path: 'paciente/formulario', component: FormularioComponent},
  {path: 'paciente/formulario/:id', component: FormularioComponent},
  {path: 'paciente/ver/:id', component: FichaComponent},
  {path: 'login', component: LoginComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PacienteComponent,
    FormularioComponent,
    FichaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [PacienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
