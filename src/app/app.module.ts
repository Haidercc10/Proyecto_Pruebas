import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultarAsistenciaComponent } from './Vistas/ConsultarAsistencia/ConsultarAsistencia/ConsultarAsistencia.component';
import { RegistrarAsistenciaComponent } from './Vistas/RegistroAsistencia/RegistrarAsistencia/RegistrarAsistencia.component';
export const routes: Routes = [
  {path: 'inicio', component: AppComponent},
  {path: '', component: RegistrarAsistenciaComponent},
  {path: 'consultar', component: ConsultarAsistenciaComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrarAsistenciaComponent,
    ConsultarAsistenciaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
