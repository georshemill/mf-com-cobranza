import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor() { }

  popupError(title:string,mensaje:string){
    Swal.fire({title: title,
               text: mensaje,
               icon: 'error',
               confirmButtonText: 'Aceptar'
             })
  }

  popupExito(title:string,mensaje:string){
    Swal.fire(title,mensaje,'success')
  }

  popupExitoCrud(title:string){
    //Swal.fire(title,mensaje,'success')

    Swal.fire({
      icon: 'success',
      title: title, 
      showDenyButton: true,
      confirmButtonText: "Aceptar",
      denyButtonColor: ' #607D8B',
      denyButtonText: `Imprimir`,
      confirmButtonColor: '#03A9F4',
    }).then((result) => {
      if (result.isDenied) {
        //this.printBarra(this.codigoAp_Derivacion)
        }
    })
  }

  popupExitoAutoCerrado(title:string){
    Swal.fire({position: 'top-end',icon: 'success',title: title,showConfirmButton: false,timer: 1500})
  }

  popupConfirmacion(titulo:string,mensaje:string,textButton:string){
    return Swal.fire({title: titulo,text: mensaje,icon: 'warning',showCancelButton: true,confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: textButton,cancelButtonText: 'Cancelar',})
  }

  getnamemes(mes:string){
    let mesLiteral = "";
    switch(mes){
      case "01":
        mesLiteral = "ENERO";
        break;
      case "02":
        mesLiteral = "FEBRERO";
        break;
      case "03":
        mesLiteral = "MARZO";
        break;
      case "04":
        mesLiteral = "ABRIL";
        break;
      case "05":
        mesLiteral = "MAYO";
        break;
      case "06":
        mesLiteral = "JUNIO";
        break;
      case "07":
        mesLiteral = "JULIO";
        break;
      case "08":
        mesLiteral = "AGOSTO";
        break;
      case "09":
        mesLiteral = "SETIEMBRE";
        break;
      case "10":
        mesLiteral = "OCTUBRE";
        break;
      case "11":
        mesLiteral = "NOVIEMBRE";
        break;
      case "12":
        mesLiteral = "DICIEMBRE";
        break;
    }

    return mesLiteral;
  }

  roundTo(value:number,args:number) : number{
    const factor = 10 ** args;
    return Math.round(value * factor) / factor;
  }

  formatDate(fecha:Date) : Date{
    return new Date(formatDate(fecha, 'short', 'en-US'));
  }

  devolverFechaHora(fecha: Date): string {
    return '' + fecha.getFullYear() + '-' +
        ((fecha.getMonth() < 9) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '-' +
        ((fecha.getDate() < 10) ? '0' + fecha.getDate() : fecha.getDate()) + ' ' +
        ((fecha.getHours() < 10) ? '0' + fecha.getHours() : fecha.getHours()) + ':' +
        ((fecha.getMinutes() < 10) ? '0' + fecha.getMinutes() : fecha.getMinutes()) + ':' +
        ((fecha.getSeconds() < 10) ? '0' + fecha.getSeconds() : fecha.getSeconds());
}

/*devolverFecha(fecha: Date): string {
  return '' +fecha.getFullYear()  + '-' +
      ((fecha.getMonth() < 9) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '-' +
      ((fecha.getDate() < 10) ? '0' + fecha.getDate() : fecha.getDate()) ;
}*/

devolverFecha(fecha: any): string {
  return '' +fecha.getFullYear()  + '-' +
      ((fecha.getMonth() < 9) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '-' +
      ((fecha.getDate() < 10) ? '0' + fecha.getDate() : fecha.getDate()) ;
}

devolverAnio(fecha: any): string {
  return '' +fecha.getFullYear() 
}
  
}
