import { Component,Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosModule } from '../../parametros.module';
import { Popover } from 'primeng/popover';
import { Localidad } from '../../../models/Localidad';
import { GestionCatastro } from '../../../models/GestionCatastro';
import { Departamento } from '../../../models/Departamento';
import { Provincia } from '../../../models/Provincia';
import { Distrito } from '../../../models/Distrito';
import { Sector } from '../../../models/Sector';
import { Manzanas } from '../../../models/Manzanas';
import { FichaIncompleta } from '../../../models/FichaIncompleta';
import { TipoPredio } from '../../../models/TipoPredio';
import { TipoConstruccion } from '../../../models/TipoConstruccion';
import { TipoAbastecimiento } from '../../../models/TipoAbastecimiento';
import { TipoAlmacenaje } from '../../../models/TipoAlmacenaje';
import { Rutas } from '../../../models/Rutas';
import { TipoCorrespondencia } from '../../../models/TipoCorrespondencia';
import { CentroPoblado } from '../../../models/CentroPoblado';
import { Urbanizacion } from '../../../models/Urbanizacion';
import { TipoDocumento } from '../../../models/TipoDocumento';
import { TipoServicio } from '../../../models/TipoServicio';
import { TipoUsuario } from '../../../models/TipoUsuario';
import { TipoActividad } from '../../../models/TipoActividad';
import { Tarifas } from '../../../models/Tarifas';
import { TipoResponsable } from '../../../models/TipoResponsable';
import { TipoMaterialTubo } from '../../../models/TipoMaterialTubo';
import { TipoAccesorios } from '../../../models/TipoAccesorios';
import { TipoDiametros } from '../../../models/TipoDiametros';
import { TipoEstadoConexion } from '../../../models/TipoEstadoConexion';
import { TipoAccesorioNoReglamentario } from '../../../models/TipoAccesorioNoReglamentario';
import { TipoCorteServicio } from '../../../models/TipoCorteServicio';
import { TipoPavimento } from '../../../models/TipoPavimento';
import { TipoVereda } from '../../../models/TipoVereda';
import { TipoFugas } from '../../../models/TipoFugas';
import { TipoModeloCajaConex } from '../../../models/TipoModeloCajaConex';
import { TipoLlavesMedidor } from '../../../models/TipoLlavesMedidor';
import { TipoMaterialCaja } from '../../../models/TipoMaterialCaja';
import { TipoLocalizaCaja } from '../../../models/TipoLocalizaCaja';
import { TipoEstadoCaja } from '../../../models/TipoEstadoCaja';
import { TipoTapa } from '../../../models/TipoTapa';
import { TipoEstadoTapa } from '../../../models/TipoEstadoTapa';
import { TipoFacturacion } from '../../../models/TipoFacturacion';
import { TipoEstadoLectura } from '../../../models/TipoEstadoLectura';
import { EstadoMedidor } from '../../../models/EstadoMedidor';
import { MarcaMedidor } from '../../../models/MarcaMedidor';
import { ModeloHomologacion } from '../../../models/ModeloHomologacion';
import { ModeloMedidor } from '../../../models/ModeloMedidor';
import { PosicionMedidor } from '../../../models/PosicionMedidor';
import { TipoMedidor } from '../../../models/TipoMedidor';
import { CapacidadMedidor } from '../../../models/medidor/CapacidadMedidor';
import { TipoLectura } from '../../../models/TipoLectura';
import { TipoResultadoVerifMedidor } from '../../../models/medidor/TipoResultadoVerifMedidor';
import { TipoSituacionMedidor } from '../../../models/medidor/TipoSituacionMedidor';
import { TipoClaseMetrologica } from '../../../models/medidor/TipoClaseMetrologica';
import { TipoVerificacionMedidor } from '../../../models/medidor/TipoVerificacionMedidor';
import { TipoTramiteIngreso } from '../../../models/TipoTramiteIngreso';
import { TipoIngresoConexion } from '../../../models/TipoIngresoConexion';
import { TipoPiscina } from '../../../models/TipoPiscina';
import { Calles } from '../../../models/Calles';
import { SearchCorrespondencia } from '../../../models/SearchCorrespondencia';
import { FuncionesService } from '../../../services/funciones.service';
import { Personas } from '../../../models/Personas';
import { UnidadesUsoCatastro } from '../../../models/RequierimientoColateral';
import { ZonaAbastecimiento } from '../../../models/ZonaAbastecimiento';
import { TipoPresion } from '../../../models/TipoPresion';
import { ComercializacionService } from '../../../services/Cobranza.service';


type IntBooleanKeys<T> = {
  [K in keyof T]: T[K] extends 0 | 1 ? K : never
}[keyof T];

@Component({
  selector: 'app-gestion-conexiones',
  imports: [ParametrosModule],
  templateUrl: './gestion-conexiones.component.html',
  styleUrl: './gestion-conexiones.component.scss',
  providers: [ComercializacionService]
})
export class GestionConexionComponent implements OnInit {
  
  _localidad:Localidad[] = []
  _departamento:Departamento[] = []
  _provincia:Provincia[] = []
  _distrito:Distrito[] = []
  _sector:Sector[] = []
  _sectorOperacional:Sector[] = []
  _sectorxCiclo:Sector[] = []
  _manzanas:Manzanas[] = [] //falta
  _calles:Calles[] = []

  _fichaIncompleta:FichaIncompleta[] = []
  _tipoPredio:TipoPredio[] = []
  _tipoConstruccion:TipoConstruccion[] = []
  _tipoAbastecimiento:TipoAbastecimiento[] = []
  _tipoAlmacenaje:TipoAlmacenaje[] = []
  _rutaLectura:Rutas[] = []
  _rutaDistribucion:Rutas[] = []
  _tipoCorrespondencia:TipoCorrespondencia[] = []
  _centroPoblado:CentroPoblado[] = []
  _urbanizacion:Urbanizacion[] = []
  _tipoDocumento:TipoDocumento[] = []
  _tipoServicio:TipoServicio[] = []
  _tipoUsuario:TipoUsuario[] = []
  _tipoActividad:TipoActividad[] = []
  _tarifas:Tarifas[] = []
  _tarifasModel: any = null;//:Tarifas = new Tarifas;
  _tipoResponsable:TipoResponsable[] = []
  _tipoMaterialTubo:TipoMaterialTubo[] = []
  _tipoAccesorios:TipoAccesorios[] = []
  _tipoDiametros:TipoDiametros[] = []
  _tipoDiametrosMatrizAgua:TipoDiametros[] = []
  _tipoEstadoConexion:TipoEstadoConexion[] = []
  _tipoAccesorioNoReglamentario:TipoAccesorioNoReglamentario[] = []
  _tipoCorteServicio:TipoCorteServicio[] = []
  _tipoPavimento:TipoPavimento[] = []
  _tipoVereda:TipoVereda[] = []
  _tipoFugas:TipoFugas[] = []
  _tipoModeloCajaConex:TipoModeloCajaConex[] = []
  _tipoLlavesMedidor:TipoLlavesMedidor[] = []
  _tipoMaterialCaja:TipoMaterialCaja[] = []
  _tipoLocalizaCaja:TipoLocalizaCaja[] = []
  _tipoEstadoCaja:TipoEstadoCaja[] = []
  _tipoTapa:TipoTapa[] = []
  _tipoEstadoTapa:TipoEstadoTapa[] = []
  _tipoFacturacion:TipoFacturacion[] = []
  _estadoMedidor:EstadoMedidor[] = []
  _tipoEstadoLectura:TipoEstadoLectura[] = []
  _marcaMedidor:MarcaMedidor[] = []
  _modeloMedidor:ModeloMedidor[] = []
  _modeloHomologacion:ModeloHomologacion[] = []
  _posicionMedidor:PosicionMedidor[] = []
  _tipoMedidor:TipoMedidor[] = []
  _capacidadMedidor:CapacidadMedidor[] = []
  _tipoLectura:TipoLectura[] = []
  _tipoResultadoVerifMedidor:TipoResultadoVerifMedidor[] = []
  _tipoVerificacionMedidor:TipoVerificacionMedidor[] = []
  _tipoClaseMetrologica:TipoClaseMetrologica[] = []
  _tipoSituacionMedidor:TipoSituacionMedidor[] = []
  _tipoTramiteIngreso:TipoTramiteIngreso[] = []
  _tipoIngresoConexion:TipoIngresoConexion[] = []
  _tipoPresionAgua:TipoPresion[] = []
  _zonaAbastecimiento:ZonaAbastecimiento[] = []

  _tipoFugasAlcan:TipoFugas[] = []
  _tipoMaterialTuboAlcan:TipoMaterialTubo[] = []
  _tipoDiametrosAlcan:TipoDiametros[] = []
  _tipoDiametrosMarizAlcan:TipoDiametros[] = []
  _tipoEstadoConexionAlcan:TipoEstadoConexion[] = []
  _tipoCorteServicioAlcan:TipoCorteServicio[] = []
  _tipoPavimentoAlcan:TipoPavimento[] = []
  _tipoVeredaAlcan:TipoVereda[] = []
  _tipoModeloCajaAlcan:TipoModeloCajaConex[] = []
  _tipoMaterialCajaAlcan:TipoMaterialCaja[] = []
  _tipoLocalizaCajaAlcan:TipoLocalizaCaja[] = []
  _tipoEstadoCajaAlcan:TipoEstadoCaja[] = []
  _tipoTapaAlcan:TipoTapa[] = []
  _tipoEstadoTapaAlcan:TipoEstadoTapa[] = []
  _tipoPiscina:TipoPiscina[] = []
  _modalCorrespondencia:SearchCorrespondencia=new SearchCorrespondencia
  _filtroCorrespondencia:SearchCorrespondencia[] = []
  blockTableCorrespondencia:number=0
  blockTablePersona:number=0
  nrodocumento: string=""
  datos: string=""
  campo: string=""
  parametro: string=""
  _personas:Personas[] = []
  _VariasunidadesUso:UnidadesUsoCatastro[] = []
  _totalPorcentajeDisponible:number = 100;
  _totalPorcentajeIngresado:number = 0;
  
  


  _gestionCatastro:GestionCatastro[] = []
  _gestionCatastroModel:GestionCatastro=new GestionCatastro
  _gestionCatastroModelClean:GestionCatastro=new GestionCatastro 
  dialogForm:boolean=false
  dialogCalle:boolean=false
  dialogUrba:boolean=false
  dialogCorresp:boolean=false
  dialogPersona:boolean=false
  datetime24h: Date[] | undefined;
  descripcionDireccion: string | null = null;
  descripcionUrba: string | null = null;
  descripcionDireccionCorres: string | null = null;
  buttonRecibo:number=0
  _porcentajeCategorizacion:number | null = null;
  _fechainiactividadesCategorizacion: any = null;//!: Date;
  //_tipoactividadModelCategorizacion:TipoActividad = new TipoActividad 
  //_tarifasModelCategorizacion:Tarifas = new Tarifas;
  _tarifasModelCategorizacion: any = null;
  _tipoactividadModelCategorizacion: any = null;
  maximized = false;

  stateOptions: any[] = [{ label: 'Si', value: 1 },{ label: 'No', value: 0 }];

  
  _default:{ codDefault:number, descripcion:string }[] = [
    {codDefault: 1, descripcion: 'SI'},
    {codDefault: 0, descripcion: 'NO'}]

  _frecuenciaServ:{ codDefault:number, descripcion:string }[] = [
      {codDefault: 1, descripcion: 'DIARIO'},
      {codDefault: 0, descripcion: 'NO DIARIO'}]

  _continuidadServ:{ codDefault:number, descripcion:string }[] = [
      {codDefault: 0, descripcion: '<24 horas'},
      {codDefault: 1, descripcion: '24 horas'}]

  activeAccordionIndex: number[] = [0];
  accordions = {
    ruta_distribucion: [0],
    distribucion_recibo: [0],
    actualizacion_catastral: [0],
    direccion: [0]
  }; 


@ViewChild('op') op!: Popover;

selectedMember: any = null;

members = [
  {descripcion: 'Pendiente', codigo: 0, icon: 'pi pi-clock' },
  { descripcion: 'Transferido', codigo: 1, icon: 'pi pi-check-circle' },
  { descripcion: 'Todos',codigo: 2, icon: 'pi pi-globe' }
];

tabs = [
  { title: 'Conexión/Predio', value: "0", icon: 'pi pi-home'},
  { title: 'Datos del Cliente', value: "1", icon: 'pi pi-user-edit' },
  { title: 'Conexión Agua', value: "2", icon: 'pi pi-sitemap'},
  { title: 'Medidor', value: "3", icon: 'pi pi-gauge'},
  { title: 'Conexión Desague', value: "4", icon: 'pi pi-delete-left'},
  { title: 'Calidad Servicio', value: "5", icon: 'pi pi-chart-line'},
  { title: 'Archivos Adjuntos', value: "6", icon: 'pi pi-file-import'},

];

toggle(event: Event, popover: Popover) {
  popover.toggle(event);
}




  constructor(private catastroService:ComercializacionService,
              private funcionesService:FuncionesService,
              private renderer: Renderer2
              /*private tipoabastecimientoService: TipoabastecimientoService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,*/
      
  ) 
  {
    /*this.formTipo = this.formBuilder.group({
        idTipoAbastecimiento: [{ value: '', disabled: true }],
        descripcion: ['', [Validators.required]]
      })

    this.idTipoAbastecimientoCtr= this.formTipo.get('idTipoAbastecimiento')!;
    this.descripcionCtr= this.formTipo.get('descripcion')!;
  */}

  ngOnInit(): void {
    //this._gestionCatastroModel.varias_unidades=0

    this.selectedMember = this.members[0];
     {
        this.init()
      }
  }

  init(){
    this.catastroService.dropdownLocalidad().subscribe((respuesta) => {
        this._localidad=respuesta.data
    })

    this.catastroService.dropdownDepartamento().subscribe((respuesta) => {
      this._departamento=respuesta.data
    })

    /*this.catastroService.dropdownManzanas().subscribe((respuesta) => {
      this._manzanas=respuesta.data
    })*/

    this.catastroService.dropdownFichaIncompleta().subscribe((respuesta) => {
      this._fichaIncompleta=respuesta.data
    })

    this.catastroService.dropdownTipoPredio().subscribe((respuesta) => {
      this._tipoPredio=respuesta.data
    })
    
    this.catastroService.dropdownTipoConstruccion().subscribe((respuesta) => {
      this._tipoConstruccion=respuesta.data
    })

    this.catastroService.dropdownTipoAbastecimineto().subscribe((respuesta) => {
      this._tipoAbastecimiento=respuesta.data
    })

    this.catastroService.dropdownTipoAlmacenaje().subscribe((respuesta) => {
      this._tipoAlmacenaje=respuesta.data
    })

    this.catastroService.dropdownTipoCorrespondencia().subscribe((respuesta) => {
      this._tipoCorrespondencia=respuesta.data
    })

    this.catastroService.dropdownCentroPoblado(1).subscribe((respuesta) => {
      this._centroPoblado=respuesta.data
    })

    this.catastroService.dropdownUrbanizacion(1).subscribe((respuesta) => {
      this._urbanizacion=respuesta.data
    })

    this.catastroService.dropdownTipodocumento().subscribe((respuesta) => {
      this._tipoDocumento=respuesta.data
    })

    this.catastroService.dropdownTipoServicio().subscribe((respuesta) => {
      this._tipoServicio=respuesta.data
    })

    this.catastroService.dropdownTipoUsuario().subscribe((respuesta) => {
      this._tipoUsuario=respuesta.data
    })

    this.catastroService.dropdownTipoActividad().subscribe((respuesta) => {
      this._tipoActividad=respuesta.data
    })

    this.catastroService.dropdownTipoActividad().subscribe((respuesta) => {
      this._tipoActividad=respuesta.data
    })

    this.catastroService.dropdownTipoResponsable().subscribe((respuesta) => {
      this._tipoResponsable=respuesta.data
    })

    this.catastroService.dropdownTipoMaterialTubo(1).subscribe((respuesta) => {
      this._tipoMaterialTubo=respuesta.data
    })

    this.catastroService.dropdownTipoAccesorios(1).subscribe((respuesta) => {
      this._tipoAccesorios=respuesta.data
    })

    this.catastroService.dropdownDiametros(1).subscribe((respuesta) => {
      this._tipoDiametros=respuesta.data
    })


    this.catastroService.dropdownDiametros(3).subscribe((respuesta) => {
      this._tipoDiametrosMatrizAgua=respuesta.data
    })

    this.catastroService.dropdownTipoAccesorioNoReglamentario(1).subscribe((respuesta) => {
      this._tipoAccesorioNoReglamentario=respuesta.data
    })

    this.catastroService.dropdownTipoCorteServicio(1).subscribe((respuesta) => {
      this._tipoCorteServicio=respuesta.data
    })

    this.catastroService.dropdownTipoPavimento(1).subscribe((respuesta) => {
      this._tipoPavimento=respuesta.data
    })

    this.catastroService.dropdownTipoVereda(1).subscribe((respuesta) => {
      this._tipoVereda=respuesta.data
    })

    this.catastroService.dropdownTipoFugas(1).subscribe((respuesta) => {
      this._tipoFugas=respuesta.data
    })

    this.catastroService.dropdownTipoModeloCajaConex(1).subscribe((respuesta) => {
      this._tipoModeloCajaConex=respuesta.data
    })

    this.catastroService.dropdownTipollaveMedidor().subscribe((respuesta) => {
      this._tipoLlavesMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoLocalizacionCaja(1).subscribe((respuesta) => {
      this._tipoLocalizaCaja=respuesta.data
    })

    this.catastroService.dropdownTipoCaja(1).subscribe((respuesta) => {
      this._tipoMaterialCaja=respuesta.data
    })

    this.catastroService.dropdownTipoEstadoCaja(1).subscribe((respuesta) => {
      this._tipoEstadoCaja=respuesta.data
    })

    this.catastroService.dropdownTipoEstadoTapa(1).subscribe((respuesta) => {
      this._tipoEstadoTapa=respuesta.data
    })

    this.catastroService.dropdownTipoTapa(1).subscribe((respuesta) => {
      this._tipoTapa=respuesta.data
    })


    this.catastroService.dropdownTipoFugasAlcan(2).subscribe((respuesta) => {
      this._tipoFugasAlcan=respuesta.data
    })
    
    this.catastroService.dropdownTipoMaterialTuboAlcan(2).subscribe((respuesta) => {
      this._tipoMaterialTuboAlcan=respuesta.data
    })

    this.catastroService.dropdownDiametrosAlcan(2).subscribe((respuesta) => {
      this._tipoDiametrosAlcan=respuesta.data
    })

    this.catastroService.dropdownDiametrosAlcan(4).subscribe((respuesta) => {
      this._tipoDiametrosMarizAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoEstConexion(1).subscribe((respuesta) => {
      this._tipoEstadoConexion=respuesta.data
    })

    this.catastroService.dropdownTipoEstConexionAlcan(2).subscribe((respuesta) => {
      this._tipoEstadoConexionAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoCorteServicio(2).subscribe((respuesta) => {
      this._tipoCorteServicioAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoPavimentoAlcan(2).subscribe((respuesta) => {
      this._tipoPavimento=respuesta.data
    })

    this.catastroService.dropdownTipoVeredaAlcan(2).subscribe((respuesta) => {
      this._tipoVereda=respuesta.data
    })

    this.catastroService.dropdownTipoModeloCajaAlcan(2).subscribe((respuesta) => {
      this._tipoModeloCajaAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoLocalizacionCajaAlcan(2).subscribe((respuesta) => {
      this._tipoLocalizaCajaAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoCajaAlcan(2).subscribe((respuesta) => {
      this._tipoMaterialCajaAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoEstadoCajaAlcan(2).subscribe((respuesta) => {
      this._tipoEstadoCajaAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoEstadoTapaAlcan(2).subscribe((respuesta) => {
      this._tipoEstadoTapaAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoTapaAlcan(2).subscribe((respuesta) => {
      this._tipoTapaAlcan=respuesta.data
    })

    this.catastroService.dropdownTipoFacturacion().subscribe((respuesta) => {
      this._tipoFacturacion=respuesta.data
    })

    this.catastroService.dropdownTipoEstMedidor().subscribe((respuesta) => {
      this._estadoMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoEstLectura().subscribe((respuesta) => {
      this._tipoEstadoLectura=respuesta.data
    })

    this.catastroService.dropdownTipoMarcaMedidor().subscribe((respuesta) => {
      this._marcaMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoModeloMedidor().subscribe((respuesta) => {
      this._modeloMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoModeloCertHomologa().subscribe((respuesta) => {
      this._modeloHomologacion=respuesta.data
    })

    this.catastroService.dropdownTipoCapacidadMedidor().subscribe((respuesta) => {
      this._capacidadMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoPresionAgua().subscribe((respuesta) => {
      this._tipoPresionAgua=respuesta.data
    })

    this.catastroService.dropdownTipoMedidor().subscribe((respuesta) => {
      this._tipoMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoPosicionMedidor().subscribe((respuesta) => {
      this._posicionMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoLectura().subscribe((respuesta) => {
      this._tipoLectura=respuesta.data
    })

    this.catastroService.dropdownTipoResultadoVerifMedidor().subscribe((respuesta) => {
      this._tipoResultadoVerifMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoVerificacionMedidor().subscribe((respuesta) => {
      this._tipoVerificacionMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoClaseMetrologica().subscribe((respuesta) => {
      this._tipoClaseMetrologica=respuesta.data
    })

    this.catastroService.dropdownTipoSituacionMedidor().subscribe((respuesta) => {
      this._tipoSituacionMedidor=respuesta.data
    })

    this.catastroService.dropdownTipoTramiteIngreso().subscribe((respuesta) => {
      this._tipoTramiteIngreso=respuesta.data
    })

    this.catastroService.dropdownTipoIngresoConexion().subscribe((respuesta) => {
      this._tipoIngresoConexion=respuesta.data
    })

    this.catastroService.dropdownTipopiscina().subscribe((respuesta) => {
      this._tipoPiscina=respuesta.data
    })


    //INICIALIZA TABLA GENERAL
    this._gestionCatastroModel.idSucursalBusqueda=1
    this._gestionCatastroModel.flagTransferido=1
    this.catastroService.listaCliente(this._gestionCatastroModel).subscribe((respuesta) => {
      this._gestionCatastro=respuesta.data
    })
  }

  BusquedaCorrespondencia() {

    this._modalCorrespondencia.idEmpresa=1

    this.catastroService.BusquedaCorrespondencia(this._modalCorrespondencia).subscribe({
          next: (data) => {
            if (data.data.length != 0) {
              this._filtroCorrespondencia = data.data;
              this.blockTableCorrespondencia = 1;
            } else {
              this.funcionesService.popupError("Búsqueda sin información", "");
              this._filtroCorrespondencia = [];
              this.blockTableCorrespondencia = 0;
            }
          },
          error: (err) => {
            this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
            this._filtroCorrespondencia = [];
            this.blockTableCorrespondencia = 0;
          }
        }); 
  }

  
  /*toggleCheckbox(prop: keyof GestionCatastro): void {
    const current = this._gestionCatastroModel[prop];
  
    if (current === 0 || current === 1) {
      (this._gestionCatastroModel[prop] as 0 | 1) = current === 1 ? 0 : 1;
    } else {
      console.warn(`La propiedad ${String(prop)} no es 0 o 1.`);
    }
  }*/

    setCheckboxValue(prop: IntBooleanKeys<GestionCatastro>, checked: boolean): void {
      this._gestionCatastroModel[prop] = checked ? 1 : 0;

      if(this._gestionCatastroModel.varias_unidades===0){
        this.resetar_Cate()
        this._porcentajeCategorizacion=0
        this._fechainiactividadesCategorizacion=""
        this._tarifasModelCategorizacion= null;
        this._tipoactividadModelCategorizacion= null;
      }
    }

  changeProvincia(idepartamento:any){
    this.catastroService.dropdownProvincia(idepartamento).subscribe((respuesta) => {
      this._provincia=respuesta.data
    })
  }

  changeDistrito(valor:any){
    this.catastroService.dropdownDistrito(this._gestionCatastroModel.idDepartamento!,valor).subscribe((respuesta) => {
      this._distrito=respuesta.data
    })
  }

  changeSector(idlocalidad:any){
    this._sector = [];
    this._sectorxCiclo = [];
    this._gestionCatastroModel.idSector=0
    this._gestionCatastroModel.idCiclo=0
    this.catastroService.dropdownSecxLocalidad(idlocalidad).subscribe((respuesta) => {
      this._sector=respuesta.data
    })

    this.catastroService.dropdownCallexLoc(idlocalidad).subscribe((respuesta) => {
      this._calles=respuesta.data
    })

    this.catastroService.dropdownUrbaxLoc(idlocalidad).subscribe((respuesta) => {
      this._urbanizacion=respuesta.data
    })

    this.catastroService.dropdownTarifas(idlocalidad).subscribe((respuesta) => {
      this._tarifas=respuesta.data
    })

    this.catastroService.dropdownZonaAbastec(idlocalidad).subscribe((respuesta) => {
      this._zonaAbastecimiento=respuesta.data
    })

    this.catastroService.dropdownSecOperaxLocalidad(idlocalidad).subscribe((respuesta) => {
      this._sectorOperacional=respuesta.data
    })

    this._gestionCatastroModel.zona_abastecimiento=null
    this._gestionCatastroModel.decripcion_sector_abastecimiento=null
	  this._gestionCatastroModel.descripcion_subsector_abastecimiento=null
    this._gestionCatastroModel.descripcion_reservorio_conectado=null
  }

  changeCiclo(idSector:any){
    this.catastroService.dropdownSecxCiclo(this._gestionCatastroModel.idSucursal!,idSector).subscribe((respuesta) => {
      this._sectorxCiclo=respuesta.data
    })

    this.catastroService.dropdownManzanas(this._gestionCatastroModel.idSucursal!,idSector).subscribe((respuesta) => {
      this._manzanas=respuesta.data
    })
  }

  changeManzana(idManzana:any){

    this.catastroService.dropdownRutaLectura(this._gestionCatastroModel.idSucursal!,this._gestionCatastroModel.idSector!,idManzana).subscribe((respuesta) => {
      this._rutaLectura=respuesta.data
    })

    this.catastroService.dropdownRutaDistribucion(this._gestionCatastroModel.idSucursal!,this._gestionCatastroModel.idSector!,idManzana).subscribe((respuesta) => {
      this._rutaDistribucion=respuesta.data
    })
  }






 toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
      if (event.type === 'mouseenter') {
          opt.style.display = 'flex';
          date.style.display = 'none';
      } else {
          opt.style.display = 'none';
          date.style.display = 'flex';
      }
  }

  nuevo(){
    //this.new=1
    this.dialogForm=true
  }

  editar(event: Event,gestion: GestionCatastro){
    this.dialogForm=true
   
    gestion.nroSuministro=1000001
    /*{"idEmpresa": 1,
     
      "nroSuministro":1000001}*/

    this.catastroService.BusquedaConexion(gestion).subscribe((respuesta) => {
      const ModelGeneral=respuesta.data

      //console.log(ModelGeneral.unidadesUsoList)
    
      this.changeProvincia(respuesta.data.idDepartamento)
      //this.changeDistrito(respuesta.data.idProvincia)

      this.catastroService.dropdownDistrito(respuesta.data.idDepartamento!,respuesta.data.idProvincia!).subscribe((respuesta) => {
        this._distrito=respuesta.data
      })
      
      this.catastroService.dropdownSecxCiclo(respuesta.data.idSucursal!,respuesta.data.idSector!).subscribe((respuesta) => {
        this._sectorxCiclo=respuesta.data
      })
  
      this.catastroService.dropdownManzanas(respuesta.data.idSucursal!,respuesta.data.idSector!).subscribe((respuesta) => {
        this._manzanas=respuesta.data
      })
      
      this.catastroService.dropdownSecxLocalidad(respuesta.data.idSucursal!).subscribe((respuesta) => {
        this._sector=respuesta.data
      })
  
      this.catastroService.dropdownCallexLoc(respuesta.data.idSucursal!).subscribe((respuesta) => {
        this._calles=respuesta.data
      })
  
      this.catastroService.dropdownUrbaxLoc(respuesta.data.idSucursal!).subscribe((respuesta) => {
        this._urbanizacion=respuesta.data
        this._gestionCatastroModel=ModelGeneral
        this.descripcionDireccion=this._gestionCatastroModel.descripcionDireccion
        this.descripcionUrba=this._gestionCatastroModel.descripcionUrba
        
      })
      
      this.catastroService.dropdownTarifas(respuesta.data.idSucursal!).subscribe((respuesta) => {
        this._tarifas=respuesta.data

        const tarifaSeleccionada = this._tarifas.find(t => t.idTarifa === ModelGeneral.idTarifa);
        this._tarifasModel = tarifaSeleccionada || null;
      })
  
      this.catastroService.dropdownZonaAbastec(respuesta.data.idSucursal!).subscribe((respuesta) => {
        this._zonaAbastecimiento=respuesta.data
      })
  
      this.catastroService.dropdownSecOperaxLocalidad(respuesta.data.idSucursal!).subscribe((respuesta) => {
        this._sectorOperacional=respuesta.data
        
      })

      this._VariasunidadesUso=ModelGeneral.unidadesUsoList

     
/*
    let und = new UnidadesUsoCatastro;

      und.idTipoCategoria = this._tarifasModelCategorizacion.idTipoCategoria;
      und.nombreTarifa=this._tarifasModelCategorizacion.nombreTarifa
      und.porcentajediscon  = this._porcentajeCategorizacion;
      und.descactividad     = this._tipoactividadModelCategorizacion.descripcion;
      und.fechaInicioActividad = this.funcionesService.formatDate(this._fechainiactividadesCategorizacion);

    this._VariasunidadesUso.push(und);
    this.calcular_porcentaje_ingresado();-*/

      

      /*onRowSelectDistrito(x:any){
        this.descripcionDireccion=x.data.descripcion
        this._gestionCatastroModel.idCalle=x.data.idCalle
        this.dialogCalle=false
      }
    
      onRowSelectUrba(x:any){
        this.descripcionUrba=x.data.descripcion
        this._gestionCatastroModel.idUrbanizacion=x.data.idUrbanizacion
        this.dialogUrba=false
      }*/

      //setTimeout(() => {this.changeSector(respuesta.data.idSucursal)}, 5000)
      

      console.log(respuesta.data)
      //this.dialogForm=false
        /*if(respuesta.success==true){
          this.funcionesService.popupExito("Confirmacion","El Registro se Modifico Correctamente");
          this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Actualizado',life: 3000});
          this.listar()
        }else {
          this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
        }*/
    })
    /*this.new=0
    this.dialogForm=true
    this.formTipo.patchValue(tipoAbastecimiento)*/
  }

  /*gestionar(){
    const tipoAbastecimiento: TipoAbastecimiento = this.formTipo.getRawValue()
    tipoAbastecimiento.tipo="TipoAbastecimiento"
    tipoAbastecimiento.usuarioCreacion="CHIBELASO"
    const id = this.idTipoAbastecimientoCtr.value;

      if (id === null || id === undefined || id === '')
        this.tipoabastecimientoService.crud(tipoAbastecimiento, 1).subscribe((respuesta) => {
          this.dialogForm=false
            if(respuesta.success==true){
              this.funcionesService.popupExito("Confirmacion","El Registro se Genero Correctamente");
              this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Agregado',life: 3000});
              this.listar()
            }else {
              this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Generar el Registro");
              }
            })
      else 
        this.tipoabastecimientoService.crud(tipoAbastecimiento, 2).subscribe((respuesta) => {
          this.dialogForm=false
            if(respuesta.success==true){
              this.funcionesService.popupExito("Confirmacion","El Registro se Modifico Correctamente");
              this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Actualizado',life: 3000});
              this.listar()
            }else {
              this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
            }
        })
  }*/

  desactivar(event: Event, tipoAbastecimiento: GestionCatastro) {
    /*tipoAbastecimiento.tipo="TipoAbastecimiento"
    tipoAbastecimiento.usuarioCreacion="CHIBELASO"
    event.stopPropagation();
    this.funcionesService.popupConfirmacion("Eliminar","Desea Eliminar el Registro?","Eliminar").then((result)=>{
        if(result.isConfirmed){
            this.tipoabastecimientoService.crud(tipoAbastecimiento, 3).subscribe((respuesta) => {
                if(respuesta.success==true){
                    this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Eliminado',life: 3000});
                    this.listar()
                }else {
                  this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
                }
            })
        }
    })*/
  }

  /*activar(event: Event, tipoAbastecimiento: TipoAbastecimiento) {
    tipoAbastecimiento.tipo="TipoAbastecimiento"
    tipoAbastecimiento.usuarioCreacion="CHIBELASO"
    event.stopPropagation();
    this.funcionesService.popupConfirmacion("Activar","Desea Activar el Registro?","Activar").then((result)=>{
        if(result.isConfirmed){
            this.tipoabastecimientoService.crud(tipoAbastecimiento, 4).subscribe((respuesta) => {
                if(respuesta.success==true){
                    this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Activado',life: 3000});
                    this.listar()
                }else {
                  this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
                }
            })
        }
    })
  }*/

    gestionar(){
      this._gestionCatastroModel.usuarioCreacion="CHIBELASO"
      this._gestionCatastroModel.flagTransferido=0
      this._gestionCatastroModel.nroSuministro=12
      this._gestionCatastroModel.idSede=1
      this._gestionCatastroModel.idCalle=1
      this._gestionCatastroModel.idTipoEstadoServicio=1
      
      

      const fechas = [
        'fecha_inspeccion',
        'fecha_actualizacion_catas',
        'fecha_inicio_actividad',
        'fecha_contrato',
        'fecha_limite_conex',
        'fecha_solicitud',
        'fecha_contrato_agua',
        'fecha_factibilidad',
        'fecha_instalacion',
        'fecha_limite_corte_solicitud',
        'fecha_instalacion_medidor',
        'fecha_verificacion',
        'fecha_lectura_anterior',
        'fecha_lectura_ultima',
        'fecha_mantenimiento',
        'fecha_afericion_inicial',
        'fecha_retiro',
        'fecha_reinstalacion',
        'fecha_constratacion_laboratorio',
        'fecha_contrastacion_campo',
        'fecha_solicitud_alcan',
        'fecha_contrato_alcan',
        'fecha_factibilidad_alcan',
        'fecha_instalacion_adicional',
      ]
      
      fechas.forEach((campo) => {
        const campoDpl = `${campo}Dpl`;
        if ((this._gestionCatastroModel as any)[campo] !== (this._gestionCatastroModel as any)[campoDpl]) {
          (this._gestionCatastroModel as any)[campo] = this.funcionesService.devolverFecha(
            (this._gestionCatastroModel as any)[campoDpl]
          );
        }
      });

      if(this._gestionCatastroModel.anio_fabricacion!=this._gestionCatastroModel.anio_fabricacionDpl){
        this._gestionCatastroModel.anio_fabricacion=this.funcionesService.devolverAnio(this._gestionCatastroModel.anio_fabricacionDpl);
      }
      
      /*this.catastroService.crudSolicitud(this._gestionCatastroModel, 1).subscribe((respuesta) => {
        //this.dialogForm=false
          /*if(respuesta.success==true){
            this.funcionesService.popupExito("Confirmacion","El Registro se Modifico Correctamente");
            this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Actualizado',life: 3000});
            this.listar()
          }else {
            this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
          }
      })*/
    }
  
  onSelectDisRecibo(x:any){
    if(x==2){
      this.buttonRecibo=1
    }else{
      this._gestionCatastroModel.sucursal_correspondencia=null
      this.descripcionDireccionCorres=null
      this._gestionCatastroModel.nro_correspondencia=null
      this._gestionCatastroModel.nroSuministroCorrespondencia=null
      this.buttonRecibo=0
    }
  }

  onRowSelectCorrespondencia(x:any){
    this._gestionCatastroModel.sucursal_correspondencia=x.data.idSucursal
    this.descripcionDireccionCorres=x.data.direccion2
    this._gestionCatastroModel.nro_correspondencia=x.data.nroCalle
    this._gestionCatastroModel.nroSuministroCorrespondencia=x.data.nroSuministro
    this.dialogCorresp=false
    this._filtroCorrespondencia = [];
    this.blockTableCorrespondencia=0
    this._modalCorrespondencia.nroSuministro=null
    this._modalCorrespondencia.propietario=null
    this._modalCorrespondencia.idSucursal=null
  }

  onRowSelectDistrito(x:any){
    this.descripcionDireccion=x.data.descripcion
    this._gestionCatastroModel.idCalle=x.data.idCalle
    this.dialogCalle=false
  }

  onRowSelectUrba(x:any){
    this.descripcionUrba=x.data.descripcion
    this._gestionCatastroModel.idUrbanizacion=x.data.idUrbanizacion
    this.dialogUrba=false
  }

  onRowSelectPersona(x:any){
    this._gestionCatastroModel.propietario=x.data.nombreCompleto
    this._gestionCatastroModel.idTipoDocIdentidad=x.data.idTipoDocIdentidad
    this._gestionCatastroModel.nroDocIdentidad=x.data.nroDocIdentidad
    this._gestionCatastroModel.telefono=x.data.telefono
    this._gestionCatastroModel.email=x.data.email
    this.dialogPersona=false
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onGlobalFilterCalle(tableCalle: Table, event: Event) {
    tableCalle.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onGlobalFilterUrba(tableUrba: Table, event: Event) {
    tableUrba.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  BusquedaPersona(){
    if(this.nrodocumento==undefined ||this.nrodocumento==""){
      this.campo="NombreCompleto"
      this.parametro=this.datos
    }else{
      this.campo="nroDocIdentidad"
      this.parametro=this.nrodocumento
    }

      this.catastroService.listarPersonas(this.campo, this.parametro).subscribe({
        next: (data) => {
          if (data.data.length != 0) {
            this._personas = data.data;
            this.blockTablePersona = 1;
          } else {
            this.funcionesService.popupError("Búsqueda sin información", "");
            this._personas = [];
            this.blockTablePersona = 0;
            this.nrodocumento = "";
            this.datos = "";
          }
        },
        error: (err) => {
          this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
          this._personas = [];
          this.blockTablePersona = 0;
          this.nrodocumento = "";
          this.datos = "";
        }
      });      
  }

  /*onChangeTarifaNormal(x:any){

    switch(x.idTipoCategoria){
      case 1:
          this._gestionCatastroModel.domestico++;
          break;
      case 3:
          this._gestionCatastroModel.comercial++;
          break;
      case 5:
          this._gestionCatastroModel.industrial++;
          break;
      case 2:
          this._gestionCatastroModel.social++;
          break;
      case 4:
          this._gestionCatastroModel.estatal++;
          break;
  }
  }*/

  previousCategoriaId: number | null = null;

onChangeTarifaNormal(x: any) {

  const categoriaMap: Record<number, keyof GestionCatastro> = {
    1: 'domestico',
    2: 'social',
    3: 'comercial',
    4: 'estatal',
    5: 'industrial'
  };
  
  if (this.previousCategoriaId != null) {
    const prevKey = categoriaMap[this.previousCategoriaId];
    if (this._gestionCatastroModel[prevKey] as any > 0) {
      this._gestionCatastroModel[prevKey]--;
    }
  }
  
  const newKey = categoriaMap[x.idTipoCategoria];
  this._gestionCatastroModel[newKey]++;
  this.previousCategoriaId = x.idTipoCategoria;

  this._gestionCatastroModel.idTarifa=x.idTarifa
}
  

  onValueChangePorcentaje(x: number){
    const intValue = Math.floor(x);

    if (intValue > 100) {
      this._porcentajeCategorizacion = 100;
    } else if (intValue < 0) {
      this._porcentajeCategorizacion = 0;
    } else {
      this._porcentajeCategorizacion = intValue;
    }
  }

  calcular_porcentaje_ingresado(){
    let sumaPorcentaje = 0;
    this._VariasunidadesUso.forEach(x => {
        sumaPorcentaje += x.porcentaje;
    });

    this._totalPorcentajeIngresado  = sumaPorcentaje;
    this._totalPorcentajeDisponible = 100 - sumaPorcentaje;
    this._porcentajeCategorizacion  = 100 - sumaPorcentaje;
  }

  sumarUnidadesUso(tipocategoria:number){
    switch(tipocategoria){
        case 1:
            this._gestionCatastroModel.domestico++;
            break;
        case 3:
            this._gestionCatastroModel.comercial++;
            break;
        case 5:
            this._gestionCatastroModel.industrial++;
            break;
        case 2:
            this._gestionCatastroModel.social++;
            break;
        case 4:
            this._gestionCatastroModel.estatal++;
            break;
    }
  }

  removeCate(idx:any){
    this._VariasunidadesUso.splice(idx,1);

    this.calcular_porcentaje_ingresado();

    this._gestionCatastroModel.domestico = 0;
    this._gestionCatastroModel.comercial = 0;
    this._gestionCatastroModel.industrial = 0;
    this._gestionCatastroModel.social = 0;
    this._gestionCatastroModel.estatal = 0;
    this._VariasunidadesUso.forEach(x => {
        this.sumarUnidadesUso(x.idTarifa);
    });
  } 

  igualar_porcentajes(){
    if(this._VariasunidadesUso.length == 0){
        this.funcionesService.popupError("Aviso de Usuario","No hay Ningun Item Ingresado");
        return;
    }

    let count:number = 0;
    let sumaPorcentaje:number = 0;

    this._gestionCatastroModel.domestico = 0;
    this._gestionCatastroModel.comercial = 0;
    this._gestionCatastroModel.industrial = 0;
    this._gestionCatastroModel.social = 0;
    this._gestionCatastroModel.estatal = 0;

    this._VariasunidadesUso.forEach(x => {
        count++;
        if(count == this._VariasunidadesUso.length){
            x.porcentaje = 100 - sumaPorcentaje;
        }else{
            sumaPorcentaje      += this.funcionesService.roundTo((100 / this._VariasunidadesUso.length),2);
            x.porcentaje   = this.funcionesService.roundTo((100 / this._VariasunidadesUso.length),2);
        }

        this.sumarUnidadesUso(x.idTarifa);
    });

    this.calcular_porcentaje_ingresado();
  }

  resetar_Cate(){
      this._VariasunidadesUso = [];

      this.calcular_porcentaje_ingresado();
      this._gestionCatastroModel.domestico = 0;
      this._gestionCatastroModel.comercial = 0;
      this._gestionCatastroModel.industrial = 0;
      this._gestionCatastroModel.social = 0;
      this._gestionCatastroModel.estatal = 0;
  }


  insertar_categorizacion(){

    if(this._tarifasModelCategorizacion ==null || this._tarifasModelCategorizacion.idTipoCategoria == null){
      this.funcionesService.popupError("Aviso de Usuario","Seleccione la Tarifa");
      return;
    }

    if(this._tipoactividadModelCategorizacion ==null ||this._tipoactividadModelCategorizacion.idTipoActividad == null){
      this.funcionesService.popupError("Aviso de Usuario","Seleccione la Actividad");
      return;
    }
    
    if(this._porcentajeCategorizacion == 0 || this._porcentajeCategorizacion == undefined || this._porcentajeCategorizacion > 100 || this._porcentajeCategorizacion < 0){
      this.funcionesService.popupError("Aviso de Usuario","El Porcentaje Ingresado no es Valido !!!");
      return;
    }

    if(this._fechainiactividadesCategorizacion== null || this._fechainiactividadesCategorizacion == undefined ){
      this.funcionesService.popupError("Aviso de Usuario","Seleccione la Fecha de Inicio de Actividad");
      return;
    }

    if(this._totalPorcentajeIngresado == 100){
        this.funcionesService.popupError("Aviso de Usuario","El Total de Porcentaje Ingresado ha LLegado al 100%");
        return;
    }

    this.sumarUnidadesUso(this._tarifasModelCategorizacion.idTipoCategoria);

    let und = new UnidadesUsoCatastro;

      und.idTipoCategoria = this._tarifasModelCategorizacion.idTipoCategoria;
      und.nombreTarifa=this._tarifasModelCategorizacion.nombreTarifa
      und.porcentaje  = this._porcentajeCategorizacion;
      und.actividad     = this._tipoactividadModelCategorizacion.descripcion;
      und.fechaInicioActividad = this.funcionesService.formatDate(this._fechainiactividadesCategorizacion);

    this._VariasunidadesUso.push(und);
    this.calcular_porcentaje_ingresado();
    
  }

  

  Filtro(member: any, popover: Popover) {
    this.selectedMember = member;
    popover.hide();
  
    this._gestionCatastroModel.flagTransferido=member.codigo
    this.catastroService.listaCliente(this._gestionCatastroModel).subscribe((respuesta) => {
      this._gestionCatastro=respuesta.data
    })

  }

  onSelect(x:any){
  //this._gestionCatastroModel.idSucursal=x
  this._gestionCatastroModel.idSucursalBusqueda=x
  this.catastroService.listaCliente(this._gestionCatastroModel).subscribe((respuesta) => {
    this._gestionCatastro=respuesta.data
  })
  }

  onSelectZonAbas(x:any){
    this._gestionCatastroModel.zona_abastecimiento=x.idZonaAbastecimiento
    this._gestionCatastroModel.decripcion_sector_abastecimiento=x.sectorAbastecimiento
	  this._gestionCatastroModel.descripcion_subsector_abastecimiento=x.subSectorAbastecimiento
    this._gestionCatastroModel.descripcion_reservorio_conectado=x.reservorio
    this._gestionCatastroModel.dias_abastecimiento=x.diasAbasteciminento
    this._gestionCatastroModel.horas_abastecimiento=x.horasAbastecimiento
    this._gestionCatastroModel.horario_abastecimiento=x.horarioAbastecimiento
	  this._gestionCatastroModel.horario_inspeccion_reclamo=x.horarioInspeccion
    
  }

  /*get dialogStyle() {
    return this.maximized
      ? { width: '100vw', height: '100vh' }
      : { width: '1400px', height: '900px' };
  }*/

      get dialogStyle() {
        return this.maximized
          ? {} // El estilo lo maneja la clase
          : { width: '1400px', height: '900px' };
      }

      fixDialogPosition() {
        setTimeout(() => {
          const el = document.querySelector('.p-dialog.dialog-maximized') as HTMLElement;
          if (el) {
            el.style.top = '0';
            el.style.left = '0';
            el.style.right = '0';
            el.style.bottom = '0';
            el.style.transform = 'none';
            el.style.height = '100vh';
            el.style.width = '100vw';
          }
        }, 0);
      }

  /*
  
  width: 100vw !important;
    height: 100vh !important;
    top: 0px !important;
    left: 0px !important;
  */

  toggleMaximize() {
    this.maximized = !this.maximized;
  }

  confirmClose() {
    /*this.confirmationService.confirm({
      message: '¿Está seguro que desea cerrar el diálogo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dialogForm = false;
      }
    });*/
  }
  
  ModalClose(){

    this.funcionesService.popupConfirmacion("Anulacion","Desea Anular el Registro?","Anular").then((result)=>{
      if(result.isConfirmed){
        this.descripcionDireccion=null
        this.descripcionUrba=null
        this.dialogForm=false
        Object.assign(this._gestionCatastroModel, this._gestionCatastroModelClean);
      }
    })

      

    /*
    this._funciones.popupConfirmacion("Anulacion","Desea Anular la Solicitud?","Anular").then((result)=>{
                  if(result.isConfirmed){
                      this._soliService.crud(1,this._soliconexionModel).subscribe(data => {
                          if(data.mensaje == "EXITO"){
                            this._funciones.popupExito("Confirmacion","La Solicitud se Anulo Correctamente");
                            this.displaySearch=false
                            this.listar()
                          }else{
                            this._funciones.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
                          }
                        })
                    }
                })
    
    */
  
  //Object.assign(this._gestionCatastroModel, this._gestionCatastroModelClean);
  }


}

