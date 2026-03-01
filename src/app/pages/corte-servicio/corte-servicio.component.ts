import { Component, OnInit } from '@angular/core';
import { ParametrosModule } from '../parametros.module';
import { CobranzaService } from '../../services/Cobranza.service';
import { GestionCorte } from '../../models/GestionCorte';
import { Localidad } from '../../models/Localidad';
import { FuncionesService } from '../../services/funciones.service';
import { MessageService } from 'primeng/api';
import { TipoEstServicio } from '../../models/TipoEstServicio';
import { TipoMotivOpe } from '../../models/TipoMotivOpe';
import { Servis } from '../../models/Servis';
import { Inspector } from '../../models/Inspector';
import { DetallePadronCorte } from '../../models/DetallePadronCorte';
import { TipoCorte } from '../../models/TipoCorte';
import { GlobalSession } from '../utils/globalSession';
import { hideGlobalLoader, showGlobalLoader } from '@test/mf-utils-modules';

@Component({
  selector: 'app-corte-servicio',
  imports: [ParametrosModule],
  templateUrl: './corte-servicio.component.html',
  styleUrl: './corte-servicio.component.scss',
  providers: [CobranzaService]
})
export class CorteServicioComponent implements OnInit  {

  idEmpresaTk = GlobalSession.idEmpresa;
  idSedeTk = GlobalSession.idSede;
  usuarioTk = GlobalSession.usuario;
  idUsuarioTk = GlobalSession.idUsuario;

  _localidad:Localidad[] = []
  _tipoEstServicio:TipoEstServicio[] = []
  _tipoMotivOpe:TipoMotivOpe[] = []
  _servis:Servis[] = []
  _inspector:Inspector[] = []
  _tipoCorteAgu:TipoCorte[] = []
  _tipoCorteAlca:TipoCorte[] = []

  blockTable:number=0



  _gestionCorteModel:GestionCorte=new GestionCorte
  _listaCorte:GestionCorte[] = []
  _listadoCore:DetallePadronCorte[] = []
  fechActual=new Date();


  tabs = [
    { title: 'Corte Programado', value: "0", icon: 'pi pi-user-edit' },
    { title: 'Corte Padron', value: "1", icon: 'pi pi-home'},
  ]
  



  constructor(private cobranzaService:CobranzaService,
                private funcionesService:FuncionesService,
                private messageService: MessageService) 
        {     }

  ngOnInit(): void {
    this.init()
  }


  init(){
    
    this.cobranzaService.dropdownLocalidad().subscribe((respuesta) => {
      this._localidad=respuesta.data
    })

    this.cobranzaService.dropdownTipoEstServicio().subscribe((respuesta) => {
      this._tipoEstServicio=respuesta.data.filter(x => x.idTipoEstServicio !== 1)
    })

    this.cobranzaService.dropdownServices(1).subscribe((respuesta) => {
      this._servis=respuesta.data
    })

    this.cobranzaService.dropdownTipoMotivoOperacion(1).subscribe((respuesta) => {
      this._tipoMotivOpe=respuesta.data
    })

    this.cobranzaService.dropdownTipoCorte(1,1).subscribe((respuesta) => {
      this._tipoCorteAgu=respuesta.data
    })

    this.cobranzaService.dropdownTipoCorte(1,2).subscribe((respuesta) => {
      this._tipoCorteAlca=respuesta.data
    })

    this._gestionCorteModel.fechacorteDpl=this.funcionesService.devolverFecha(this.fechActual)
    


  }

  changeService(x:any){

    this.cobranzaService.dropdownInspector(1,x.idService,"CORE").subscribe((respuesta) => {
      this._inspector=respuesta.data
    })

    this._gestionCorteModel.descripcionServisCab=x.descripcion
    this._gestionCorteModel.idServiceCab=x.idService

  }

  changeEstado(x:any){
    this._gestionCorteModel.idTipoEstServicioCab=x.idTipoEstServicio
  }

  changeOperacion(x:any){
    //console.log(x)
    this._gestionCorteModel.idMotivoOperacionCab=x.idTipoMotivoOperacion
    this._gestionCorteModel.tipoCorteAguaCabecera=x.idTipoCoreAgua
    this._gestionCorteModel.descripcionCorteCab=x.descripcion
    this._gestionCorteModel.tipoCorteDesCab=x.idTipoCoreDes

    if(x.idTipoCoreDes==0){
      this._gestionCorteModel.fechaLimiteDpl=null
    }else{
      this._gestionCorteModel.fechaLimiteDpl=this.funcionesService.devolverFecha(this.fechActual)
    }
    

    
  }

  changeCorteAgu(x:any){
    this._gestionCorteModel.coreAguaCabecera=x.idTipoCore
  }

  changeCorteAlca(x:any){
    this._gestionCorteModel.coreAlcaCabecera=x.idTipoCore
  }

  changeInspector(x:any){

    this._gestionCorteModel.codInspectorCabecera=x.idInspector
    this._gestionCorteModel.inspectorCabecera=x.nombres
  }


  BuscarCliente(){

    if( !this._gestionCorteModel.nroSuministro?.toString().trim() && !this._gestionCorteModel.propietario?.toString().trim()) {
      this.funcionesService.popupError("Ingrese Campo de Busqueda","");
    return;
    }

    this._gestionCorteModel.idSede=this.idSedeTk
    this._gestionCorteModel.idEmpresa=this.idEmpresaTk

    showGlobalLoader()

    this.cobranzaService.consultaCorteServicio(this._gestionCorteModel).subscribe({
      next: (data) => {
        if (data.data.length != 0) {
          this._listaCorte = data.data;
          hideGlobalLoader()
          //this.blockTable = 1;
        } else {
          hideGlobalLoader()
          this.funcionesService.popupError("Búsqueda sin información", "");
          this._listaCorte = [];
          //this.blockTable=0
        }
      },
      error: (err) => {
        hideGlobalLoader()
        this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
        this._listaCorte = [];
        //this.blockTable=0
      }
    });

  }

  /*
this._reclamo.idTipoGradoParentesco==undefined || this._reclamo.idTipoGradoParentesco==null || this._reclamo.idTipoGradoParentesco==0  
*/

  onRowSelect(x:any){
   //console.log(x)

    if( this._gestionCorteModel.idTipoEstServicioCab==undefined || this._gestionCorteModel.idTipoEstServicioCab==null || this._gestionCorteModel.idTipoEstServicioCab==0  ){
      this.funcionesService.popupError("Aviso de Usuario","Debe Seleccionar Estado de Servicio");
    return;
    }

    if( this._gestionCorteModel.idMotivoOperacionCab==undefined || this._gestionCorteModel.idMotivoOperacionCab==null || this._gestionCorteModel.idMotivoOperacionCab==0  ){
      this.funcionesService.popupError("Aviso de Usuario","Debe Seleccionar Motivo de Operacion");
    return;
    }

    if( this._gestionCorteModel.idServiceCab==undefined || this._gestionCorteModel.idServiceCab==null || this._gestionCorteModel.idServiceCab==0  ){
      this.funcionesService.popupError("Aviso de Usuario","Debe Seleccionar Servis");
    return;
    }

    if( this._gestionCorteModel.codInspectorCabecera==undefined || this._gestionCorteModel.codInspectorCabecera==null || this._gestionCorteModel.codInspectorCabecera==0  ){
      this.funcionesService.popupError("Aviso de Usuario","Debe Seleccionar Inspector");
    return;
    }


    let core =new DetallePadronCorte

    const duplicado = this._listadoCore.some((f) => f.nroSuministro === x.nroSuministro);
    if (duplicado) {
      this.messageService.add({
        severity: "warn",summary: "Aviso de usuario",
        detail: "El Registro ya se encuentra Asignado",life: 3000});
        return;
    }

    core.propietario=x.propietario
    core.nroSuministro=x.nroSuministro
    core.idTipoCorteAgua=this._gestionCorteModel.tipoCorteAguaCabecera
    core.idTipoCorteDesague=this._gestionCorteModel.tipoCorteDesCab
    core.coreAgua=this._gestionCorteModel.coreAguaCabecera
    core.coreAlca=this._gestionCorteModel.coreAlcaCabecera
    core.idInspector=this._gestionCorteModel.codInspectorCabecera
    core.inspector=this._gestionCorteModel.inspectorCabecera
    core.descripcionCorte=this._gestionCorteModel.descripcionCorteCab
    core.descripcionServis=this._gestionCorteModel.descripcionServisCab
    core.idEstadoServicio=this._gestionCorteModel.idTipoEstServicioCab
    core.idMotivoOperacion=this._gestionCorteModel.idMotivoOperacionCab
    core.fechaCorteCampo=this._gestionCorteModel.fechacorteDpl
    core.anio=x.anio
    core.nombreMes=x.nombreMes
    core.idService=this._gestionCorteModel.idServiceCab
    core.fechaLimiteSolicitud=this._gestionCorteModel.fechaLimiteDpl



    this._listadoCore = this._listadoCore ?? [];
    this._listadoCore.push(core)
    this._listaCorte = this._listaCorte.filter((f) => f.nroSuministro !== x.nroSuministro);

  }

  /*eliminarDeSeleccionados(facturacion: any) {
    this.mesesSeleccionados = this.mesesSeleccionados.filter(
      (f) => f.nroFacturacion !== facturacion.nroFacturacion
    );
  }*/

  removeCore(idx:any){
    /*console.log(idx)*/
    this._listadoCore.splice(idx,1);
    /*this.mesesSeleccionados = this.mesesSeleccionados.filter(
      (f) => f.nroFacturacion !== facturacion.nroFacturacion
    );*/
  } 


  gestionar(){
    this._gestionCorteModel.usuarioCreacion=this.usuarioTk
    
    this._gestionCorteModel.coreList=this._listadoCore

    //console.log(this._gestionCorteModel)

    showGlobalLoader()

    this.cobranzaService.registraCore(this._gestionCorteModel).subscribe({
      next: (respuesta) => {
        if (respuesta.success==true) {
          this.blockTable = 0;
          hideGlobalLoader()
          this._listadoCore=[]
          this.funcionesService.popupExito("Confirmacion","El Registro se Genero Correctamente");
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

  

  toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
    if (event.type === 'mouseenter') {
        opt.style.display = 'flex';
        date.style.display = 'none';
    } else {
        opt.style.display = 'none';
        date.style.display = 'flex';
    }
  }
}
