import { Component, Inject, Injectable, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AsistenciaUsuarioService } from 'src/app/Servicios/AsistenciaUsuario.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-RegistrarAsistencia',
  templateUrl: './RegistrarAsistencia.component.html',
  styleUrls: ['./RegistrarAsistencia.component.css']
})
export class RegistrarAsistenciaComponent implements OnInit {

  public data:any=[];
  today : any = new Date(); //Variable que se usará para llenar la fecha actual
  hora : any; //Variable que almacenará la hora actual

  constructor(private registroAsistService : AsistenciaUsuarioService,
                private usuarioServie : UsuariosService,) {
  }

  ngOnInit(): void {
    this.fecha()
  }

  //Funcion cacturará la fecha actual y la guardará en una variable
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
  }

  //
  consulta_insercionAsistencia(){
    // var format = 'hh:mm:ss'
    // let hora : any = moment('09:34:00',format);
    let datoHuella : any;
    let usuario : any;
    let turno : any;
    if (this.hora.isBetween('07:00:00', '18:00:00')) turno = 'Diurno';
    else if (this.hora.isBetween('18:00:00', '07:00:00')) turno = 'Nocturno';

    this.usuarioServie.srvObtenerListaPorHuella(datoHuella).subscribe(datos_usuario => {
      usuario = datos_usuario.usua_Id;

      this.registroAsistService.srvObtenerListaPorUsuario(datoHuella, this.today).subscribe(datos_registro => {
        if (datos_registro.length != 0) {
          if (datos_registro.RegOpe_Hora1 != '') {
            let datos_registroAsistencia : any = {
              Usu_Id : usuario,
              RegOpe_Fecha : this.today,
              Turno_Id : turno,
              RegOpe_HoraEntrada : '',
              RegOpe_HoraInicioReceso : this.hora,
              RegOpe_HoraFinReceso : '',
              RegOpe_HoraSalida : '',
            }

            this.registroAsistService.srvActualizar(usuario, datos_registroAsistencia).subscribe(datos_asistencia => {
              Swal.fire({
                icon: 'error',
                title: 'Asistencia Registrada!',
                text: 'La salida a receso de la persona X el día Y ha sido registrado con éxito!'
              });
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido registrar su salida a receso!'
              });
            });
          } else if (datos_registro.RegOpe_Hora1 != '' && datos_registro.RegOpe_Hora2 != '') {
            let datos_registroAsistencia : any = {
              Usu_Id : usuario,
              RegOpe_Fecha : this.today,
              Turno_Id : turno,
              RegOpe_HoraEntrada : '',
              RegOpe_HoraInicioReceso : '',
              RegOpe_HoraFinReceso : this.hora,
              RegOpe_HoraSalida : '',
            }

            this.registroAsistService.srvActualizar(usuario, datos_registroAsistencia).subscribe(datos_asistencia => {
              Swal.fire({
                icon: 'error',
                title: 'Asistencia Registrada!',
                text: 'El regreso de receso de la persona X el día Y ha sido registrado con éxito!'
              });
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido registrar su regreso de receso!'
              });
            });
          } else if (datos_registro.RegOpe_Hora1 != '' && datos_registro.RegOpe_Hora2 != '' && datos_registro.RegOpe_Hora3 != '') {
            let datos_registroAsistencia : any = {
              Usu_Id : usuario,
              RegOpe_Fecha : this.today,
              Turno_Id : turno,
              RegOpe_HoraEntrada : '',
              RegOpe_HoraInicioReceso : '',
              RegOpe_HoraFinReceso : '',
              RegOpe_HoraSalida : this.hora,
            }

            this.registroAsistService.srvActualizar(usuario, datos_registroAsistencia).subscribe(datos_asistencia => {
              Swal.fire({
                icon: 'error',
                title: 'Asistencia Registrada!',
                text: 'La salida de turno de la persona X el día Y ha sido registrado con éxito!'
              });
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha podido registrar su salida de turno!'
              });
            });
          }
        } else {
          let datos_registroAsistencia : any = {
            Usu_Id : usuario,
            RegOpe_Fecha : this.today,
            Turno_Id : turno,
            RegOpe_HoraEntrada : this.hora,
            RegOpe_HoraInicioReceso : '',
            RegOpe_HoraFinReceso : '',
            RegOpe_HoraSalida : '',
          }

          this.registroAsistService.srvGuardar(datos_registroAsistencia).subscribe(datos_asistencia => {
            Swal.fire({
              icon: 'error',
              title: 'Asistencia Registrada!',
              text: 'La asistencia de la persona X el día Y ha sido registrado con éxito!'
            });
          }, error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ha podido registrar su asistencia!'
            });
          });
        }
      });
    });
  }

}
