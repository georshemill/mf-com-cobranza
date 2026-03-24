import { Component, OnInit } from '@angular/core';
import { ParametrosModule } from '../parametros.module';
import { CobranzaService } from '../../services/Cobranza.service';
import { GlobalSession } from '../utils/globalSession';
import { Localidad } from '../../models/Localidad';
import { Ciclo } from '../../models/Ciclo';
import { Calendario } from '../../models/Calendario';
import { SaldoCuenta } from '../../models/SaldoCuenta';
import { hideGlobalLoader, showGlobalLoader } from '@test/mf-utils-modules';
import { FuncionesService } from '../../services/funciones.service';
import { MessageService } from 'primeng/api';
import { ListResponse } from '../../responses/ListResponse';
import { map } from 'rxjs';

@Component({
  selector: 'app-saldo-cuenta',
  imports: [ParametrosModule],
  templateUrl: './saldo-cuenta.component.html',
  styleUrl: './saldo-cuenta.component.scss',
  providers: [CobranzaService]
})
export class SaldoCuentaComponent implements OnInit{

  idEmpresaTk = GlobalSession.idEmpresa;
  idSedeTk = GlobalSession.idSede;
  usuarioTk = GlobalSession.usuario;
  idUsuarioTk = GlobalSession.idUsuario;

  _localidad:Localidad[] = []
  _ciclo:Ciclo[] = []
  _facMensualModel:SaldoCuenta=new SaldoCuenta
  _anioXciclo:Calendario[] = []
  _mesXciclo:Calendario[] = []
  _listaResumen:SaldoCuenta[] = []
  blockFiltro=0 
  urlView: string=""
  urlImpresion: string=""
  displayPDF:boolean=false

  totales = {
    importe: 0,
  };

  constructor(private cobranzaService:CobranzaService,
    private funcionesService:FuncionesService,
    private messageService: MessageService) 
  {     }

ngOnInit(): void {

this.init()

}

init(){ 

this.cobranzaService.dropdownLocalidadXsede(this.idSedeTk).pipe(
      map((resp: ListResponse<Localidad[]>) => [
          {idSucursal: 0,idCiclo:0, descripcion: 'TODOS'},
          ...(resp.data ?? [])  ])
      ).subscribe((data: Localidad[]) => {
      this._localidad = data;
    });

this.cobranzaService.dropdownCiclo(this.idSedeTk).subscribe((respuesta) => {
  this._ciclo = respuesta.data;
});

this.cobranzaService.ConsultaParamae({idEmpresa: this.idEmpresaTk,idSede: this.idSedeTk,tipoParametro: "REPORTES",codigoParametro:"URL"}).subscribe(data => {
  this.urlImpresion= data.data.valorParametro
});


}

changeCiclo(x:any){

this.cobranzaService.dropdownAnio(x).subscribe((respuesta) => {
  this._anioXciclo = respuesta.data;
});

}

changeAnio(x:any){

this.cobranzaService.dropdownMes(this._facMensualModel.idCiclo!,x).subscribe((respuesta) => {
  this._mesXciclo = respuesta.data;
});
}

searchResumen(){

if ( this._facMensualModel.idSucursal==null ) {
  this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
    detail: "Debe Seleccionar Localidad.", life: 3000
  });
  return;
}

if ( this._facMensualModel.anio ==null ) {
  this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
    detail: "Debe Seleccionar Año.", life: 3000
  });
  return;
}

if ( this._facMensualModel.mes ==null ) {
  this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
    detail: "Debe Seleccionar Mes.", life: 3000
  });
  return;
}


this._facMensualModel.idEmpresa=this.idEmpresaTk
this._facMensualModel.idSede=this.idSedeTk
showGlobalLoader()
this.cobranzaService.searchResumenSaldoXCobr(this._facMensualModel).subscribe({
  next: (data) => {
    if (data.data.length != 0) {
      this._listaResumen = data.data;

      this.totales = this._listaResumen.reduce((acc, item) => {
        acc.importe += item.importe || 0;
        return acc;
      }, {
        importe: 0,
      });
      this.blockFiltro = 1;
      hideGlobalLoader()
    } else {
      hideGlobalLoader()
      this.funcionesService.popupError("Búsqueda sin información", "");
      this._listaResumen = [];
      this.blockFiltro=0
    }
  },
  error: (err) => {
    hideGlobalLoader()
    this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
    this._listaResumen = [];
    this.blockFiltro=0
  }
});

}


viewReporte(x:any){
this.urlView=`${this.urlImpresion}/saldos/SaldosPeriodoXClientePDF.php?idempresa=1&idsede=${this.idSedeTk}&anio=${this._facMensualModel.anio}&mes=${this._facMensualModel.mes}&idciclo=${this._facMensualModel.idCiclo}&idsucursal=${this._facMensualModel.idSucursal}&tiporeporte=${x}` ;
this.displayPDF=true
}

viewResumen(){
  this.urlView=`${this.urlImpresion}/cobranza/saldosXPeriodo.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdCiclo=${this._facMensualModel.idCiclo}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}&Tipo=0` ;
  this.displayPDF=true
}

viewExcel(){
  const url=`${this.urlImpresion}/saldos/SaldosPeriodoXCliente.php?idempresa=1&idsede=${this.idSedeTk}&anio=${this._facMensualModel.anio}&mes=${this._facMensualModel.mes}&idciclo=${this._facMensualModel.idCiclo}&idsucursal=${this._facMensualModel.idSucursal}` ;
   
  const link = document.createElement('a');
  link.href = url;
  link.click();
}



}

