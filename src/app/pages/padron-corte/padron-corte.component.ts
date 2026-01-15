import { Component, OnInit } from '@angular/core';
import { CobranzaService } from '../../services/Cobranza.service';
import { ParametrosModule } from '../parametros.module';
import { FuncionesService } from '../../services/funciones.service';
import { MessageService } from 'primeng/api';
import { Localidad } from '../../models/Localidad';
import { Sector } from '../../models/Sector';
import { Ciclo } from '../../models/Ciclo';
import { map } from 'rxjs/operators';
import { ListResponse } from '../../responses/ListResponse';
import { TipoServicio } from '../../models/TipoServicio';
import { TipoEstServicio } from '../../models/TipoEstServicio';
import { TipOrdenamiento } from '../../models/TipOrdenamiento';
import { TipoMotivOpe } from '../../models/TipoMotivOpe';
import { Servis } from '../../models/Servis';
import { ClienteCorte } from '../../models/ClienteCorte';
import { GestionPadronCorte } from '../../models/GestionPadronCorte';
import { GlobalSession } from '../utils/globalSession';
import { hideGlobalLoader, showGlobalLoader } from '@test/mf-utils-modules';



type IntBooleanKeys<T> = {
  [K in keyof T]: T[K] extends 0 | 1 ? K : never
}[keyof T];
@Component({
  selector: 'app-padron-corte',
  imports: [ParametrosModule],
  templateUrl: './padron-corte.component.html',
  styleUrl: './padron-corte.component.scss',
  providers: [CobranzaService]
})
export class PadronCorteServicioComponent implements OnInit {


  idEmpresaTk = GlobalSession.idEmpresa;
  idSedeTk = GlobalSession.idSede;
  usuarioTk = GlobalSession.usuario;
  idUsuarioTk = GlobalSession.idUsuario;
  
  _localidad:Localidad[] = []
  _sector:Sector[] = []
  _ciclo:Ciclo[] = []
  _tipoServicio:TipoServicio[] = []
  _tipoEstServicio:TipoEstServicio[] = []
  _tipOrdenamiento:TipOrdenamiento[] = []
  _tipoMotivOpe:TipoMotivOpe[] = []
  _servis:Servis[] = []
  displayPDF:boolean=false
  urlView: string=""


  _gestionCorteModel:GestionPadronCorte=new GestionPadronCorte
  _listaCorte:GestionPadronCorte[] = []



  localiBloque: number | null = null;
  blockTable:number=0
  cicli!: string



  constructor(private cobranzaService:CobranzaService,
              private funcionesService:FuncionesService,
              private messageService: MessageService) 
      {     }

  ngOnInit(): void {
    this.init()
  }


  init(){

    this.cobranzaService.dropdownTipoServicio().subscribe((respuesta) => {
      this._tipoServicio=respuesta.data
    })

    this.cobranzaService.dropdownTipoEstServicio().subscribe((respuesta) => {
      this._tipoEstServicio=respuesta.data
    })

    this.cobranzaService.dropdownTipOrdenamiento().subscribe((respuesta) => {
      this._tipOrdenamiento=respuesta.data
    })

    this.cobranzaService.dropdownServices(1).subscribe((respuesta) => {
      this._servis=respuesta.data
    })

    this.cobranzaService.dropdownTipoMotivoOperacion(1).subscribe((respuesta) => {
      this._tipoMotivOpe=respuesta.data
    })


    


    /*this.cobranzaService.dropdownCiclo(1).subscribe((respuesta) => {
      this._ciclo=respuesta.data
    })*/
    this.cobranzaService.dropdownCiclo(1).pipe(
      map((resp: ListResponse<Ciclo[]>) => [
          {idSucursal: null, idCiclo: 0, sucursal: null, descripcion: 'TODOS',
          idSectorOperacional: 1,sectorOperacional:'' },
          ...(resp.data ?? [])  ])
      ).subscribe((data: Ciclo[]) => {
      this._ciclo = data;
    });
  }


  changeCiclo(x:any){
    /*this.cobranzaService.dropdownLocalidadxCiclo(1,x).subscribe((respuesta) => {
      this._localidad=respuesta.data
    })*/
    this.cobranzaService.dropdownLocalidadxCiclo(1,x).pipe(
      map((resp: ListResponse<Localidad[]>) => [
          {idSucursal: 0,idCiclo:0, descripcion: 'TODOS'},
          ...(resp.data ?? [])  ])
      ).subscribe((data: Localidad[]) => {
      this._localidad = data;
    });

    this._gestionCorteModel.sectorList=[]


  }

  changeLocalidad(x:any){
    /*this.locali=x.idSucursal
    this.cicli=x.idCiclo
*/
    this._gestionCorteModel.sectorList=[]
    if(x.idSucursal==0){
      this.localiBloque=null
    }else{
      this.localiBloque=1
    }

    this._gestionCorteModel.idSucursal=x.idSucursal

    this.cobranzaService.dropdownSectorxCiclo(x.idCiclo,x.idSucursal).subscribe((respuesta) => {
      this._sector=respuesta.data
    })
  }

  setCheckboxValue(prop: IntBooleanKeys<GestionPadronCorte>, checked: boolean): void {
    this._gestionCorteModel[prop] = checked ? 1 : 0;

  }
  

  Gestionar(){
    this._gestionCorteModel.idSede=this.idSedeTk
    this._gestionCorteModel.idEmpresa=this.idEmpresaTk

    showGlobalLoader()
    this.cobranzaService.consultaListaCorte(this._gestionCorteModel).subscribe({
      next: (data) => {
        if (data.data.length != 0) {
          this._listaCorte = data.data;
          this.blockTable = 1;
          hideGlobalLoader()
        } else {
          hideGlobalLoader()
          this.funcionesService.popupError("Búsqueda sin información", "");
          this._listaCorte = [];
          this.blockTable=0
        }
      },
      error: (err) => {
        hideGlobalLoader()
        this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
        this._listaCorte = [];
        this.blockTable=0
      }
    });
  }

  GuardarCorte(){

    this._gestionCorteModel.usuarioCreacion=this.usuarioTk

    const fechas = [
      'fechaInicio',
      'fechaLimite',
    ]

    fechas.forEach((campo) => {
      const campoDpl = `${campo}Dpl`;
      if ((this._gestionCorteModel as any)[campo] !== (this._gestionCorteModel as any)[campoDpl]) {
        (this._gestionCorteModel as any)[campo] = this.funcionesService.devolverFecha(
          (this._gestionCorteModel as any)[campoDpl]
        );
      }
    });

    this._gestionCorteModel.clienteList = this._listaCorte.map(g => ({
      nroSuministro: g.nroSuministro!,
      idEstadoServicio: g.idEstadoServicio!,
      deudaTotal: g.deudaCobrable!
    }));

    showGlobalLoader()
    this.cobranzaService.registraPadronCorte(this._gestionCorteModel).subscribe({
      next: (respuesta) => {
        if (respuesta.success==true) {
          this._gestionCorteModel.idCiclo=null
          this._gestionCorteModel.idSucursal=null
          this._gestionCorteModel.sectorList=[]
          this._gestionCorteModel.tipoServicioList=[]
          this._gestionCorteModel.estadoServicioList=[]
          this._gestionCorteModel.idService=null
          this._gestionCorteModel.idMotivoOperacion=null
          this._gestionCorteModel.descripcion=null
          this._gestionCorteModel.fechaInicioDpl=null
          this._gestionCorteModel.fechaLimiteDpl=null
          this.blockTable = 0;
          hideGlobalLoader()
          let mensajeAlert="Se Genero Orden de Pago Nro <br><strong style='font-size: 35px; '>"+ respuesta.dataId+ "</strong>"
          this.funcionesService.popupExitoCrud(mensajeAlert);
          this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Padron Generado',life: 3000});

         
        } else {
          hideGlobalLoader()
          this.funcionesService.popupError("Error de Ejecucion", respuesta.message);
          this._listaCorte = [];
          this.blockTable=0
        }
      },
      error: (err) => {
        hideGlobalLoader()
        this.funcionesService.popupError("Error de Ejecucion", "Intente nuevamente");
        this._listaCorte = [];
        this.blockTable=0
      }
    });

  }


  viewPDF(){
    
    this.urlView="http://apisistemas.ddns.net/comercialWEB/cortes/ordenCore.php?idempresa=1&idsede=2&nroordencore=44"
    this.displayPDF=true
  }


}
