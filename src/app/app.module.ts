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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FichaComponent } from './paciente/ficha/ficha.component';
import { LoginComponent } from './usuarios/login.component';
import { DetallesFacturaComponent } from './facturas/detalles-factura.component';
import { ListadoFacturasComponent } from './facturas/listado-facturas.component';
import { FacturasFormComponent } from './facturas/facturas-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListadoTratamientosComponent } from './facturas/listado-tratamientos.component';
import { ListadoTratamientoFormComponent } from './facturas/listado-tratamiento-form.component';





const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pacientes', component: PacienteComponent},
  {path: 'paciente/formulario', component: FormularioComponent},
  {path: 'paciente/formulario/:id', component: FormularioComponent},
  {path: 'paciente/ver/:id', component: FichaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id', component: DetallesFacturaComponent},
  {path: 'facturas', component: ListadoFacturasComponent},
  {path: 'facturas/form/:pacienteId', component: FacturasFormComponent},
  {path: 'tratamientos', component: ListadoTratamientosComponent},
  {path: 'tratamientos/form', component: ListadoTratamientoFormComponent},

  
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
    LoginComponent,
    DetallesFacturaComponent,
    ListadoFacturasComponent,
    FacturasFormComponent,
    ListadoTratamientoFormComponent,
    ListadoTratamientosComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [PacienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
