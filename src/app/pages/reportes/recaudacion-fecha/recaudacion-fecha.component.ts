import { Component, OnInit } from '@angular/core';
import { hideGlobalLoader, showGlobalLoader } from '@test/mf-utils-modules';
import { map } from 'rxjs';
import { ParametrosModule } from '../../parametros.module';
import { CobranzaService } from '../../../services/Cobranza.service';
import { GlobalSession } from '../../utils/globalSession';
import { FuncionesService } from '../../../services/funciones.service';
import { MessageService } from 'primeng/api';
import { Sede } from '../../../models/Sede';
import { Localidad } from '../../../models/Localidad';
import { GestionCuadre } from '../../../models/GestionCuadre';
import { Cajero } from '../../../models/Cajero';
import { Car } from '../../../models/Car';
import { ListResponse } from '../../../responses/ListResponse';

@Component({
  selector: 'app-recaudacion-fecha',
  imports: [ParametrosModule],
  templateUrl: './recaudacion-fecha.component.html',
  styleUrl: './recaudacion-fecha.component.scss',
  providers: [CobranzaService]
})
export class RecaudacionFechaComponent implements OnInit{

  idEmpresaTk = GlobalSession.idEmpresa;
  idSedeTk = GlobalSession.idSede;
  usuarioTk = GlobalSession.usuario;
  idUsuarioTk = GlobalSession.idUsuario;

  fechActual=new Date();
    fechActualFiltro = new Date().toLocaleDateString('en-CA');
    _sede:Sede[] = []
    _localidad:Localidad[] = []
    _cajero:Cajero[] = []
    _cuadreModel:GestionCuadre=new GestionCuadre
    _cuadrexForma:GestionCuadre[] = []
    _cuadrexTipo:GestionCuadre[] = []
    _cuadrexSede:GestionCuadre[] = []
    _cuadrexComprobante:GestionCuadre[] = []
    //_cuadrexImporte:CuadrexImporte[] = []
    blockTable:number=0
    blockPadron:number=0
    urlView: string=""
    urlImpresion: string=""
    displayPDF:boolean=false
    Fechatotal: string=""
  
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
      impCanje: 0,
    };
  
    filtroCar: number = 0;
  
    _car:Car[] = []

    tabs = [
      { title: 'Recaudacion por Fecha', value: "0", icon: 'pi pi-ticket'},
      //{ title: 'Resumen por Importe de Pago', value: "1", icon: 'pi pi-money-bill'},
      //{ title: 'Balancín', value: "2", icon: 'pi pi-address-book' },
    ]

    activeAccordionIndex: number[] = [0];
accordions = {
  ruta_distribucion: [0],
  distribucion_recibo: [0],
  actualizacion_catastral: [0],
  direccion: [0],
  solicitante: [0],
}; 


  constructor(private cobranzaService:CobranzaService,
    private funcionesService:FuncionesService,
    private messageService: MessageService
  )
  {}
  
  ngOnInit(): void {
    this.init()
  }

  init(){

    this._cuadreModel.idEmpresa=this.idEmpresaTk
    this._cuadreModel.idSedeBsq=this.idSedeTk
    this._cuadreModel.idSucursal=this.idSedeTk
    this._cuadreModel.fechaDpl=this.funcionesService.devolverFecha(this.fechActual)
    this._cuadreModel.fechaDplFin=this.funcionesService.devolverFecha(this.fechActual)


    this.cobranzaService.dropdownSede().subscribe((respuesta) => {
      this._sede=respuesta.data
    })

    /*this.cobranzaService.dropdowCajero(this.idEmpresaTk,this.idSedeTk).subscribe((respuesta) => {
      this._cajero=respuesta.data
    })*/
   
      this.cobranzaService.dropdowCajero(this.idEmpresaTk,this.idSedeTk).pipe(
        map((resp: ListResponse<Cajero[]>) => [
            {idEmpresa: 0,idSede:0,idCar:"", cajero: 'TODOS',
              flagExtranet:"",estado:"",
            },
            ...(resp.data ?? [])  ])
        ).subscribe((data: Cajero[]) => {
        this._cajero = data;
      });

    this.cobranzaService.dropdownLocalidadXsede(this.idSedeTk).pipe(
          map((resp: ListResponse<Localidad[]>) => [
              {idSucursal: 0,idCiclo:0, descripcion: 'TODOS'},
              ...(resp.data ?? [])  ])
          ).subscribe((data: Localidad[]) => {
          this._localidad = data;
    });

    this.cobranzaService.dropdownCar(this.idEmpresaTk!, this.idSedeTk!, this.usuarioTk).pipe(
      map((resp: ListResponse<Car[]>) => [
          {idCar: 0, descripcion: 'TODOS',impMaxAprobado:0,
            idFormaPago:0,idTipoComision:0,importeComision:0,
            porcentajeComision:0,flagCierreOperaciones:0
          },
          ...(resp.data ?? [])  ])
      ).subscribe((data: Car[]) => {
        this._car = data;
      });

      this.cobranzaService.ConsultaParamae({idEmpresa: this.idEmpresaTk,idSede: this.idSedeTk,tipoParametro: "REPORTES",codigoParametro:"URL"}).subscribe(data => {
        this.urlImpresion= data.data.valorParametro
      });
  

  }


  Busqueda(){
  
  
    if(!this._cuadreModel.idSedeBsq?.toString().trim() //&&!this._cuadreModel.nrodocumentoBsq?.toString().trim()&&
         //!this._cuadreModel.nrosuministroBsq?.toString().trim() 
         && !this._cuadreModel.fechaDpl?.toString().trim()){
  
        this.funcionesService.popupError("Ingrese Campos de Busqueda","");
      }
  
    showGlobalLoader()

  
      this._cuadreModel.idEmpresa=this.idEmpresaTk
      this._cuadreModel.idSede=this.idSedeTk
      //this._cuadreModel.idCar=1//idCar,
      //this._cuadreModel.cajero="PCHAVEZ"//this.usuarioTk
     
      const fecha = this._cuadreModel.fechaDpl;
      const formatoISO = /^\d{4}-\d{2}-\d{2}$/;
  
      if (formatoISO.test(fecha!)) {
        this._cuadreModel.fechaIni = fecha;
      } else {
        this._cuadreModel.fechaIni = this.funcionesService.devolverFecha(fecha);
      }

      const fechaFin = this._cuadreModel.fechaDplFin;
      const formatoISOFin = /^\d{4}-\d{2}-\d{2}$/;
  
      if (formatoISOFin.test(fechaFin!)) {
        this._cuadreModel.fechaFin = fechaFin;
      } else {
        this._cuadreModel.fechaFin = this.funcionesService.devolverFecha(fechaFin);
      }
  
  
  
    this.cobranzaService.CobranzaxFecha(this._cuadreModel).subscribe({
        next: (data) => {
          if (data.data.length != 0) {
            this._cuadrexTipo = data.data;

            this.totales = this._cuadrexTipo.reduce((acc, item) => {
              acc.impAgua += item.impAgua || 0;
              acc.impAlcantarillado += item.impAlcantarillado || 0;
              acc.impCargoFijo += item.impCargoFijo || 0;
              acc.impInteres += item.impInteres|| 0;
              acc.impOtrosConceptos += item.impOtrosConceptos|| 0;
              acc.impIGV += item.impIGV|| 0;
              acc.redondeoAnterior += item.redondeoAnterior|| 0;
              acc.redondeoActual += item.redondeoActual|| 0;
              acc.impTotalMes += item.impTotalMes|| 0;
              acc.impCanje += item.impCanje|| 0;
      
              return acc;
            }, {
              impAgua: 0,
              impAlcantarillado: 0,
              impCargoFijo: 0,
              impInteres: 0,
              impOtrosConceptos: 0,
              impIGV: 0,
              redondeoAnterior: 0,
              redondeoActual: 0,
              impTotalMes: 0,
              impCanje: 0,
            });
            

            this.blockTable=1
  
            hideGlobalLoader()
          } else {
            hideGlobalLoader()
            this._cuadrexTipo = [];
            this.blockTable=0
            //this._gestionSolicitudModel.nrosolicitudBsq=null
          }
        },
        error: (err) => {
          hideGlobalLoader()
          this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
          this._cuadrexTipo = [];
          this.blockTable=0
          //this._gestionSolicitudModel.nrosolicitudBsq=null
        }
    }); 
  

  }

  /*toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
    if (event.type === 'mouseenter') {
        opt.style.display = 'flex';
        date.style.display = 'none';
    } else {
        opt.style.display = 'none';
        date.style.display = 'flex';
    }
  }*/
    toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
      if (event.type === 'mouseenter') {
        opt.style.display = 'inline-flex';
        date.style.display = 'none';
      } else {
        opt.style.display = 'none';
        date.style.display = 'inline';
      }
    }
  
  viewPDF(){
    this.urlView=`${this.urlImpresion}/recaudacion/cuadreCaja.php?idempresa=${this.idEmpresaTk}&idsede=${this.idSedeTk}&idCar=${this.filtroCar}&fecha=${this.Fechatotal}&usuarioCreacion=${this.usuarioTk}`;
    this.displayPDF=true
  }
  
  viewPDF2(){
    this.urlView=`${this.urlImpresion}/recaudacion/cuadreCaja_02.php?idempresa=${this.idEmpresaTk}&idsede=${this.idSedeTk}&idCar=${this.filtroCar}&fecha=${this.Fechatotal}&usuarioCreacion=${this.usuarioTk}`;
    this.displayPDF=true
  }

  viewDetalle(x:any){
    //http://apisistemas.ddns.net/comercialWEB/recaudacion/cuadreCaja.php?idempresa=1&idsede=2&idCar=1&fecha=2026-03-03&usuarioCreacion=LALIAGA
    this.urlView=`${this.urlImpresion}/recaudacion/cuadreCaja.php?idempresa=${this.idEmpresaTk}&idsede=${this.idSedeTk}&idCar=${x.idCar}&fecha=${x.diaPago}&usuarioCreacion=${x.usuarioCreacion}`;
    this.displayPDF=true
  }

  Resumen(){

    this.urlView=`${this.urlImpresion}/recaudacion/reporte_cobranza_pivot.php?fechaini=${this._cuadreModel.fechaIni}&fechafin=${this._cuadreModel.fechaFin}&idsede=${this.idSedeTk}&idsucursal=${this._cuadreModel.idSucursal}&idempresa=${this.idEmpresaTk}`;
    this.displayPDF=true

  }

}
