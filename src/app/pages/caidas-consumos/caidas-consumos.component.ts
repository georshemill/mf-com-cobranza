import { Component } from '@angular/core';
import { CobranzaService } from '../../services/Cobranza.service';
import { ParametrosModule } from '../parametros.module';
import { GlobalSession } from '../utils/globalSession';
import { Localidad } from '../../models/Localidad';
import { Ciclo } from '../../models/Ciclo';
import { SaldoCuenta } from '../../models/SaldoCuenta';
import { Calendario } from '../../models/Calendario';
import { FuncionesService } from '../../services/funciones.service';
import { MessageService } from 'primeng/api';
import { ListResponse } from '../../responses/ListResponse';
import { map } from 'rxjs';
import { hideGlobalLoader, showGlobalLoader } from '@test/mf-utils-modules';
import { Reporteador } from '../../models/Reporteador';

@Component({
  selector: 'app-caidas-consumos',
  imports: [ParametrosModule],
  templateUrl: './caidas-consumos.component.html',
  styleUrl: './caidas-consumos.component.scss',
  providers: [CobranzaService]
})
export class CaidasConsumosComponent {

  idEmpresaTk = GlobalSession.idEmpresa;
  idSedeTk = GlobalSession.idSede;
  usuarioTk = GlobalSession.usuario;
  idUsuarioTk = GlobalSession.idUsuario;
  
  _localidad:Localidad[] = []
  _ciclo:Ciclo[] = []
  _facMensualModel:Reporteador=new Reporteador
  _anioXciclo:Calendario[] = []
  _mesXciclo:Calendario[] = []
  _listaResumen:Reporteador[] = []
  blockFiltro=0 
  urlView: string=""
  urlImpresion: string=""
  displayPDF:boolean=false

  totales = {
    impAgua: 0,
    impAlcantarillado: 0,
    impCargoFijo: 0,
    impInteres: 0,
    impOtrosConceptos: 0,
    impIGV: 0,
    redondeoAnterior: 0,
    redondeoActual: 0,
    impTotalMes: 0,
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

this.cobranzaService.dropdownCiclo(this.idSedeTk)
/*.subscribe((respuesta) => {
  this._ciclo = respuesta.data;
});*/
.pipe(
  map((resp: ListResponse<Ciclo[]>) => [
      {idSucursal: 0,idCiclo:0, descripcion: 'TODOS',sucursal:'',idSectorOperacional:0,sectorOperacional:''},
      ...(resp.data ?? [])  ])
  ).subscribe((data: Ciclo[]) => {
  this._ciclo = data;
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
/// showGlobalLoader()


this.urlView=`${this.urlImpresion}/cobranza/altoconCaidaCon.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdCiclo=${this._facMensualModel.idCiclo}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
this.displayPDF=true
}


viewTarifas(){
this.urlView=`${this.urlImpresion}/facturacion/facturacionResumen.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
this.displayPDF=true
}

viewConcepto(){
this.urlView=`${this.urlImpresion}/facturacion/facturacionXConceptos.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
this.displayPDF=true
}

viewFactu(){
this.urlView=`${this.urlImpresion}/facturacion/facturacionMensualXTipoFact.php?idEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
this.displayPDF=true
}

viewMedicion(){
this.urlView=`${this.urlImpresion}/facturacion/facturacionMensualXMedidor.php?idEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
this.displayPDF=true
}


}

