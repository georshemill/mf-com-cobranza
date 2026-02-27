import { Component, OnInit } from '@angular/core';
import { CobranzaService } from '../../services/Cobranza.service';
import { ParametrosModule } from '../parametros.module';
import { GlobalSession } from '../utils/globalSession';
import { Sector } from '../../models/Sector';
import { Localidad } from '../../models/Localidad';
import { Ciclo } from '../../models/Ciclo';
import { FiltroCliente } from '../../models/FiltroCliente';
import { ListResponse } from '../../responses/ListResponse';
import { FuncionesService } from '../../services/funciones.service';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { ReporteCierre } from '../../models/ReporteCierre';

@Component({
  selector: 'app-cierre-fecha',
  imports: [ParametrosModule],
  templateUrl: './cierre-fecha.component.html',
  styleUrl: './cierre-fecha.component.scss',
  providers: [CobranzaService]
})
export class CierreFechaComponent implements OnInit{
 

  idEmpresaTk = GlobalSession.idEmpresa;
  idSedeTk = GlobalSession.idSede;
  usuarioTk = GlobalSession.usuario;
  idUsuarioTk = GlobalSession.idUsuario;

  _localidad:Localidad[] = []
  _sector:Sector[] = []
  _ciclo:Ciclo[] = []
  _cierreModel:ReporteCierre=new ReporteCierre
  localiBloque: number | null = null;
  blockFiltro=0
  urlView: string=""
  urlImpresion: string=""
  displayPDF:boolean=false


  constructor(private facturacionService:CobranzaService,
    private funcionesService:FuncionesService,
    private messageService: MessageService) 
  {     }

  ngOnInit(): void {
  
    this.init()
  }

  init(){

    this.facturacionService.ConsultaParamae({idEmpresa: this.idEmpresaTk,idSede: this.idSedeTk,tipoParametro: "REPORTES",codigoParametro:"URL"}).subscribe(data => {
      this.urlImpresion= data.data.valorParametro
    });

    this.facturacionService.dropdownCiclo(this.idSedeTk).pipe(
      map((resp: ListResponse<Ciclo[]>) => [
          {idSucursal: null, idCiclo: 0, sucursal: null, descripcion: 'TODOS',
          idSectorOperacional: 0,sectorOperacional:'',anio:'',mes:'',nombreMes:'' },
          ...(resp.data ?? [])  ])
      ).subscribe((data: Ciclo[]) => {
      this._ciclo = data;
    });


  }

  changeCiclo(x:any){    
    this.facturacionService.dropdownLocalidadxCiclo(this.idSedeTk,x).pipe(
      map((resp: ListResponse<Localidad[]>) => [
          {idSucursal: 0,idCiclo:0, descripcion: 'TODOS'},
          ...(resp.data ?? [])  ])
      ).subscribe((data: Localidad[]) => {
      this._localidad = data;
    });

  }

  changeLocalidad(x:any){
   
    if(this._cierreModel.idSucursal==0){
      this.localiBloque=null
      this._cierreModel.idSector=0
    }else{
      this.localiBloque=1
    }

    this.facturacionService.dropdownSectorxCiclo(x,this._cierreModel.idSucursal!).subscribe((respuesta) => {
      this._sector=respuesta.data
    })
  }

  //http://apisistemas.ddns.net/comercialWEB/cobranza/CorteReaperturaXPeriodo.php?idempresa=1&idsede=2&idsucursal=2&idciclo=0&fechaini=2026-02-25&fechafin=2026-02-25
  searchCierre(){


    if ( this._cierreModel.idCiclo ==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Ciclo.", life: 3000
      });
      return;
    }

    if ( this._cierreModel.idSucursal==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Localidad.", life: 3000
      });
      return;
    }


    if ( this._cierreModel.fecDesdeDpl==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Fecha Inicio.", life: 3000
      });
      return;
    }

    if ( this._cierreModel.fecHastaDpl==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Fecha Fin.", life: 3000
      });
      return;
    }

    this._cierreModel.fecDesde=this.funcionesService.devolverFecha(this._cierreModel.fecHastaDpl)
    this._cierreModel.fecHasta=this.funcionesService.devolverFecha(this._cierreModel.fecHastaDpl)
    

    this.urlView=`${this.urlImpresion}/cobranza/CorteReaperturaXPeriodo.php?idempresa=1&idsede=${this.idSedeTk}&idsucursal=${this._cierreModel.idSucursal}&idciclo=${this._cierreModel.idCiclo}&fechaini=${this._cierreModel.fecDesde}&fechafin=${this._cierreModel.fecHasta}` ;
    this.displayPDF=true
  }
}
