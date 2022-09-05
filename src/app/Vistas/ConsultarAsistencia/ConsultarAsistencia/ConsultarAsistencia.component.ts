import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaUsuarioService } from 'src/app/Servicios/AsistenciaUsuario.service';
import { TurnosService } from 'src/app/Servicios/Turnos.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ConsultarAsistencia',
  templateUrl: './ConsultarAsistencia.component.html',
  styleUrls: ['./ConsultarAsistencia.component.css']
})
export class ConsultarAsistenciaComponent implements OnInit {

  public FormFiltrosConsulta !: FormGroup;
  today : any = new Date(); //Variable que se usará para llenar la fecha actual
  hora : any; //Variable que almacenará la hora actual
  turnos : any = []; //Variable que almacenará los turnos que se mostrarán en los filtros
  datosAsistencia : any = []; //Variable que almacenará la informacion de las horas trabajadas por ca da trabajador en la fecha estipulada

  constructor(private asistenciaUsuariosService : AsistenciaUsuarioService,
                private usuariosService : UsuariosService,
                  private frmBuilder : FormBuilder,
                    private turnosService : TurnosService,) {

    this.FormFiltrosConsulta = this.frmBuilder.group({
      idTrabajador : [''],
      NombreTrabajador : [''],
      fechaInicial : [''],
      fechaFinal : [''],
      Turno : [''],
    });
  }

  ngOnInit() {
    this.fecha();
  }

  //Funcion cacturará la fecha actual y la guardará en una variables, hará lo mismo con la hora actual
  fecha(){
    this.today = new Date();
    this.hora = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
    var dd : any = this.today.getDate();
    var mm : any = this.today.getMonth() + 1;
    var yyyy : any = this.today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    this.today = yyyy + '-' + mm + '-' + dd;

    this.FormFiltrosConsulta.setValue({
      idTrabajador : '',
      NombreTrabajador : '',
      fechaInicial : '',
      fechaFinal : this.today,
      Turno : '',
    });
  }

  // Fumcion para obtener los turnos y almacenarlos en una variable
  obtenerTurnos(){
    this.turnosService.srvObtenerLista().subscribe(datos_turnos => {
      for (let i = 0; i < datos_turnos.length; i++) {
        this.turnos.push(datos_turnos[i].turno_Nombre);
      }
    });
  }

  // Consultar asistencia por los diferentes filtros
  consultarAsistencia(){
    this.datosAsistencia = [];
    let TrabajadorId : number = this.FormFiltrosConsulta.value.idTrabajador;
    let nombreTrabajador : string = this.FormFiltrosConsulta.value.NombreTrabajador;
    let fechaInicial : any = this.FormFiltrosConsulta.value.fechaInicial;
    let fechaFinal : any = this.FormFiltrosConsulta.value.fechaFinal;
    let turno : string = this.FormFiltrosConsulta.value.Turno;

    if ((TrabajadorId != null || nombreTrabajador != null) && fechaInicial != null && fechaFinal != null && turno != null) {

    } else if ((TrabajadorId != null || nombreTrabajador != null) && fechaInicial != null && fechaFinal != null) {

    } else if ((TrabajadorId != null || nombreTrabajador != null) && fechaInicial != null && turno != null) {

    } else if (fechaInicial != null && fechaFinal != null && turno != null) {

    } else if (fechaInicial != null && turno != null) {

    } else if ((TrabajadorId != null || nombreTrabajador != null) && fechaInicial != null) {

    } else if (fechaInicial != null) {

    } else Swal.fire("¡Debe llenar como minimo el campo 'Fecha Inicial'!");
  }

  // Funcion que limpiará los filtros a excepcion de la fecha final que lo llenará con la fecha actual
  limpiarCampos(){
    this.datosAsistencia = [];
    this.FormFiltrosConsulta.setValue({
      idTrabajador : '',
      NombreTrabajador : '',
      fechaInicial : '',
      fechaFinal : this.today,
      Turno : '',
    });
  }

}
