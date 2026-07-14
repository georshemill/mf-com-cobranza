import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { ReporteCore } from '../../models/ReporteCore';
import Swal from 'sweetalert2';



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
  _localidadReporte:Localidad[] = []
  _sector:Sector[] = []
  _ciclo:Ciclo[] = []
  _tipoServicio:TipoServicio[] = []
  _tipoEstServicio:TipoEstServicio[] = []
  _tipOrdenamiento:TipOrdenamiento[] = []
  _tipoMotivOpe:TipoMotivOpe[] = []
  _servis:Servis[] = []
  displayPDF:boolean=false
  impPadron: number=0
  urlView: string=""
  urlImpresion: string=""


  _gestionCorteModel:GestionPadronCorte=new GestionPadronCorte
  _listaCorte:GestionPadronCorte[] = []

  _reporteCoreModel:ReporteCore=new ReporteCore
  _listaCore:ReporteCore[] = []



  localiBloque: number | null = null;
  blockTable:number=0
  blockTableCore:number=0
  cicli!: string

  _TipoOperacion:{ idTipoOperacion:number, descripcion:string }[] = [
    {idTipoOperacion: 1, descripcion: 'CORTE'},
    {idTipoOperacion: 2, descripcion: 'REAPERTURA'}]

    

  tabs = [
    { title: 'Gestion de Notificación', value: "0", icon: 'pi pi-user-edit' },
    { title: 'Gestion de Reportes', value: "1", icon: 'pi pi-home'},
  ]




  constructor(private cobranzaService:CobranzaService,
              private funcionesService:FuncionesService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef) 
      {     }

  ngOnInit(): void {
    this.init()
    
  }


  init(){

    this._reporteCoreModel.idSucursal=this.idSedeTk
    this._reporteCoreModel.idTipoOperacion=1

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

    this.cobranzaService.ConsultaParamae({idEmpresa: this.idEmpresaTk,idSede: this.idSedeTk,tipoParametro: "REPORTES",codigoParametro:"URL"}).subscribe(data => {
      this.urlImpresion= data.data.valorParametro
    });

    this.cobranzaService.dropdownLocalidadXsede(this.idSedeTk).subscribe((respuesta) => {
      this._localidadReporte = respuesta.data;
    });

    


    /*this.cobranzaService.dropdownCiclo(1).subscribe((respuesta) => {
      this._ciclo=respuesta.data
    })*/
    this.cobranzaService.dropdownCiclo(this.idSedeTk).pipe(
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
    this.cobranzaService.dropdownLocalidadxCiclo(this.idSedeTk,x).pipe(
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

   
    if ( this._gestionCorteModel.idCiclo==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Ciclo.", life: 3000
      });
      return;
    }

    if ( this._gestionCorteModel.idSucursal==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Localidad.", life: 3000
      });
      return;
    }

    if ( this._gestionCorteModel.sectorList.length === 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Aviso de usuario",
        detail: "Debe seleccionar al menos un Sector.",
        life: 3000
      });
      return;
    }

    if ( this._gestionCorteModel.tipoServicioList.length === 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Aviso de usuario",
        detail: "Debe seleccionar al menos un Tipo de Servicio.",
        life: 3000
      });
      return;
    }

    if ( this._gestionCorteModel.estadoServicioList.length === 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Aviso de usuario",
        detail: "Debe seleccionar al menos un Estado de Servicio.",
        life: 3000
      });
      return;
    }


    this._gestionCorteModel.idSede=this.idSedeTk
    this._gestionCorteModel.idEmpresa=this.idEmpresaTk

    showGlobalLoader()
    this.cobranzaService.consultaListaCorte(this._gestionCorteModel).subscribe({
      next: (data) => {
        if (data.data.length != 0) {
          this._listaCorte = data.data;
          this.initSelection(); 
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


    if ( this._gestionCorteModel.idService==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Service.", life: 3000
      });
      return;
    }

    if ( this._gestionCorteModel.idMotivoOperacion==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Motivo Operacion.", life: 3000
      });
      return;
    }

   

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

    /*this._gestionCorteModel.clienteList = this._listaCorte.map(g => ({
      nroSuministro: g.nroSuministro!,
      idEstadoServicio: g.idEstadoServicio!,
      deudaTotal: g.deudaCobrable!
    }));*/

    const seleccionados = this.getSelectedRows();

    this._gestionCorteModel.clienteList = seleccionados.map(g => ({
      nroSuministro: g.nroSuministro!,
      idEstadoServicio: g.idEstadoServicio!,
      deudaTotal: g.deudaCobrable!
    }));


    if ( this._gestionCorteModel.clienteList.length === 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Aviso de usuario",
        detail: "Debe seleccionar al menos un Registro.",
        life: 3000
      });
      return;
    }

    showGlobalLoader()
    this.cobranzaService.registraPadronCorte(this._gestionCorteModel).subscribe({
      next: (respuesta) => {
        if (respuesta.success==true) {
          /*this._gestionCorteModel.idCiclo=null
          this._gestionCorteModel.idSucursal=null
          this._gestionCorteModel.sectorList=[]
          this._gestionCorteModel.tipoServicioList=[]
          this._gestionCorteModel.estadoServicioList=[]
          this._gestionCorteModel.idService=null
          this._gestionCorteModel.idMotivoOperacion=null
          this._gestionCorteModel.descripcion=null
          this._gestionCorteModel.fechaInicioDpl=null
          this._gestionCorteModel.fechaLimiteDpl=null
          this.blockTable = 1;*/
          

          hideGlobalLoader()
          this.impPadron=respuesta.dataId
          let mensajeAlert="Se Genero Orden de Corte Nro <br><strong style='font-size: 35px; '>"+ respuesta.dataId+ "</strong>"
          this.funcionesService.popupExitoCrud(mensajeAlert);
          this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Padron Generado',life: 3000});

          Swal.fire({icon: 'success',
                    title: mensajeAlert, 
                    showDenyButton: true,
                    confirmButtonText: "Aceptar",
                    denyButtonColor: ' #607D8B',
                    denyButtonText: `Imprimir`,
                    confirmButtonColor: '#03A9F4',
          }).then((result:any) => {
            if (result.isConfirmed) {
              // Si el usuario hizo clic en "Aceptar", enfocar y seleccionar el input
            //  this.inputSearch.input?.nativeElement.focus();
            //  this.inputSearch.input?.nativeElement.select();
            }
            if (result.isDenied) {

            this.urlView=`${this.urlImpresion}/cortes/ordenCore.php?idempresa=1&idsede=${this.idSedeTk}&nroordencore=${respuesta.dataId}`;
            //this.urlView=`http://apisistemas.ddns.net/comercialWEB/recaudacion/ordenPago.php?idEmpresa=1&idSede=${this.idSedeTk}&nroOrdenPago=${respuesta.dataId}` ;
            this.displayPDF=true
            }
          });
         
        } else {
          hideGlobalLoader()
          this.funcionesService.popupError("Error de Ejecucion", respuesta.message);
          this._listaCorte = [];
          //this.blockTable=0
        }
      },
      error: (err) => {
        hideGlobalLoader()
        this.funcionesService.popupError("Error de Ejecucion", "Intente nuevamente");
        this._listaCorte = [];
        //this.blockTable=0
      }
    });

    this.cobranzaService.consultaListaCorte(this._gestionCorteModel).subscribe({
      next: (data) => {
        if (data.data.length != 0) {
          this._listaCorte = data.data;
          this.initSelection(); 
          //hideGlobalLoader()
        } else {
          //hideGlobalLoader()
          //this.funcionesService.popupError("Búsqueda sin información", "");
          this._listaCorte = [];
          //this.blockTable=0
        }
      },
      error: (err) => {
        //hideGlobalLoader()
        //this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
        this._listaCorte = [];
        //this.blockTable=0
      }
    });

  }


  searchReport(){

    if ( this._reporteCoreModel.idSucursal==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Sede.", life: 3000
      });
      return;
    }

    /*if (!this._reporteCoreModel.nroOrdenCore && !this._reporteCoreModel.descripcion) {
      this.messageService.add({
        severity: "warn",
        summary: "Aviso de usuario",
        detail: "Debe ingresar Nro Orden Core o Descripción.",
        life: 3000
      });
      return;
    }*/

    if ( this._reporteCoreModel.idTipoOperacion==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Tipo Operacion.", life: 3000
      });
      return;
    }

    if ( this._reporteCoreModel.fechaDesdeDpl==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Fecha Inicio.", life: 3000
      });
      return;
    }

    if ( this._reporteCoreModel.fechaHastaDpl==null ) {
      this.messageService.add({severity: "warn",  summary: "Aviso de usuario",
        detail: "Debe Seleccionar Fecha Fin.", life: 3000
      });
      return;
    }

    showGlobalLoader()

    this._reporteCoreModel.idEmpresa=this.idEmpresaTk
    this._reporteCoreModel.idSede=this.idSedeTk
    this._reporteCoreModel.fechaDesde=this.funcionesService.devolverFecha(this._reporteCoreModel.fechaDesdeDpl)
    this._reporteCoreModel.fechaHasta=this.funcionesService.devolverFecha(this._reporteCoreModel.fechaHastaDpl)
    
    this.cobranzaService.reporteCore(this._reporteCoreModel).subscribe({
      next: (data) => {
        if (data.data.length != 0) {
          this._listaCore = data.data;
          hideGlobalLoader()
          this.blockTableCore = 1;
          this._reporteCoreModel.idSucursal=this.idSedeTk
          this._reporteCoreModel.idTipoOperacion=1
        } else {
          hideGlobalLoader()
          this._reporteCoreModel.idSucursal=this.idSedeTk
          this._reporteCoreModel.idTipoOperacion=1
          this.funcionesService.popupError("Búsqueda sin información", "");
          this._listaCorte = [];
          this.blockTableCore=0
        }
      },
      error: (err) => {
        this._reporteCoreModel.idSucursal=this.idSedeTk
        this._reporteCoreModel.idTipoOperacion=1
        hideGlobalLoader()
        this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
        this._listaCorte = [];
        this.blockTableCore=0
      }
    });

  }

  selectedItems: boolean[] = [];
  lastClickedIndex: number | null = null;
  allSelectedModel: boolean = false;
  
  initSelection() {
    this.selectedItems = new Array(this._listaCorte.length).fill(false);
    this.allSelectedModel = false;
  }
  
  onRowClick(corte: any, index: number, event: MouseEvent) {
    // evitar que un click en el checkbox dispare esto también
    const target = event.target as HTMLElement;
    if (target.closest('.p-checkbox')) return;
  
    if (event.shiftKey && this.lastClickedIndex !== null) {
      const min = Math.min(this.lastClickedIndex, index);
      const max = Math.max(this.lastClickedIndex, index);
      for (let i = min; i <= max; i++) {
        this.selectedItems[i] = true;
      }
    } else {
      this.selectedItems[index] = !this.selectedItems[index];
      this.lastClickedIndex = index;
    }
    this.selectedItems = [...this.selectedItems];
    this.allSelectedModel = this.selectedItems.length > 0 && this.selectedItems.every(Boolean);
    this.cdr.detectChanges();
  }
  
  toggleItem(index: number) {
    this.selectedItems[index] = !this.selectedItems[index];
    this.selectedItems = [...this.selectedItems];
    this.lastClickedIndex = index;
    this.allSelectedModel = this.selectedItems.length > 0 && this.selectedItems.every(Boolean);
    this.cdr.detectChanges();
  }
  
  onHeaderCheckboxChange(checked: boolean) {
    checked ? this.selectAll() : this.clearSelection();
  }
  
  isSelected(index: number): boolean {
    return !!this.selectedItems[index];
  }
  
  get selectedCount(): number {
    return this.selectedItems.filter(Boolean).length;
  }
  
  selectAll() {
    this.selectedItems = new Array(this._listaCorte.length).fill(true);
    this.allSelectedModel = true;
    this.cdr.detectChanges();
  }
  
  clearSelection() {
    this.selectedItems = new Array(this._listaCorte.length).fill(false);
    this.lastClickedIndex = null;
    this.allSelectedModel = false;
    this.cdr.detectChanges();
  }
  
  getSelectedRows() {
    return this._listaCorte.filter((_, i) => this.selectedItems[i]);
  }

  viewPDF(x:any){
    this.urlView=`${this.urlImpresion}/cortes/ordenCore.php?idempresa=1&idsede=${this.idSedeTk}&nroordencore=${x.nroOrdenCore}`;
    this.displayPDF=true
  }

  notiDeuda(x:any){
    this.urlView=`${this.urlImpresion}/cobranza/NotificacionDeuda.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${x.idSucursal}&NroOrdenCoRe=${x.nroOrdenCore}`;
    this.displayPDF=true
  }

  notiCorte(x:any){

    this.urlView=`${this.urlImpresion}/cobranza/NotificacionCorte.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${x.idSucursal}&NroOrdenCoRe=${x.nroOrdenCore}`;
    this.displayPDF=true
  }


}
