import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { ParametrosModule } from '../../pages/parametros.module';
import { TipoDocumento } from '../../models/TipoDocumento';
import { Localidad } from '../../models/Localidad';
import { FiltroCliente } from '../../models/FiltroCliente';
import { FuncionesService } from '../../services/funciones.service';
import { Table } from 'primeng/table';
import { CobranzaService } from '../../services/Cobranza.service';

@Component({
  selector: 'app-panel-busqueda',
  standalone: true,
  imports: [ParametrosModule],
  templateUrl: './panel-busqueda.component.html',
  styleUrl: './panel-busqueda.component.scss',
  providers: [CobranzaService]
})

export class PanelBusquedaComponent implements OnInit  {
  @Output() BusquedaCliente = new EventEmitter<any>();


  dialogForm:boolean=false
  blockTable:number=0
  blockLocalidad:number=0
  _localidad:Localidad[] = []
  _tipoDocumento:TipoDocumento[] = []
  _filtroCliente:FiltroCliente[] = []
  _modalFiltro:FiltroCliente=new FiltroCliente

  frozenCols = [
    { field: 'acciones', header: 'Acciones' }
  ];
  
  unfrozenCols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'edad', header: 'Edad' }
  ];
  
  data = [
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Editar', nombre: 'Luis', edad: 30 },
    { acciones: 'Eliminar', nombre: 'Ana', edad: 25 }
  ];

  constructor(private comercializacionService:CobranzaService,
              private funcionesService:FuncionesService,
        
    ) 
    {}

  ngOnInit(): void {
    this.init()
  }

  

  init(){ 
    this.comercializacionService.dropdownLocalidad().subscribe((respuesta) => {
      this._localidad=respuesta.data
    })
  }

  BusquedaDirecta(){

    this._modalFiltro.idEmpresa=1

    this.comercializacionService.BusquedaCliente(this._modalFiltro).subscribe({
          next: (data) => {
            if (data.data.length != 0) {
              //console.log(data.data[0])
              const resultado = {
                direccion: data.data[0].direccion,
                nroLote:data.data[0].nroLote,
                sector:data.data[0].sector,
                sucursal:data.data[0].sucursal,
                idManzana:data.data[0].idManzana,
                nroSubLote:data.data[0].nroSubLote,
                departamento:data.data[0].departamento,
                provincia:data.data[0].provincia,
                distrito:data.data[0].distrito,
                propietario:data.data[0].propietario,
                unidadComercial:data.data[0].unidadComercial,
                unidadDomestica:data.data[0].unidadDomestica,
                unidadEstatal:data.data[0].unidadEstatal,
                unidadIndustrial:data.data[0].unidadIndustrial,
                unidadSocial:data.data[0].unidadSocial,
                estadoServicio:data.data[0].estadoServicio,
                idRutaLectura:data.data[0].idRutaLectura,
                ordenRutaLectura:data.data[0].ordenRutaLectura,
                idRutaReparto:data.data[0].idRutaReparto,
                ordenRutaReparto:data.data[0].ordenRutaReparto,
                tipoServicio:data.data[0].tipoServicio,
                tipoUsuario:data.data[0].tipoUsuario,
                tarifa:data.data[0].tarifa,
                nombres:data.data[0].nombres,
                apellidos:data.data[0].apellidos,
                razonSocial:data.data[0].razonSocial,
                idTipoServicio:data.data[0].idTipoServicio,
                idTipoDocIdentidad:data.data[0].idTipoDocIdentidad,
                nroDocIdentidad:data.data[0].nroDocIdentidad,
                idSede:data.data[0].idSede,
                sede:data.data[0].sede,
                nroSuministro:data.data[0].nroSuministro,
            
              };
              this.BusquedaCliente.emit(resultado);
            } else {
              this.funcionesService.popupError("Búsqueda sin información", "");
              //this._filtroCliente = [];
              //this.blockTable = 0;
              const resultado = {
                nroSuministro: 0,
              };
              this.BusquedaCliente.emit(resultado);
            }
          },
          error: (err) => {
            this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
            //this._filtroCliente = [];
            //this.blockTable = 0;
          }
        }); 
  }

  Busqueda(){

    this._modalFiltro.idEmpresa=1

    this.comercializacionService.BusquedaCliente(this._modalFiltro).subscribe({
          next: (data) => {
            if (data.data.length != 0) {
              this._filtroCliente = data.data;
              this.blockTable = 1;
            } else {
              this.funcionesService.popupError("Búsqueda sin información", "");
              this._filtroCliente = [];
              this.blockTable = 0;
            }
          },
          error: (err) => {
            this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
            this._filtroCliente = [];
            this.blockTable = 0;
          }
        }); 
  }

  limpiar() {
    this._modalFiltro.nroSuministro=null
  }

  actualizaSucursal(x:any){
    if(x==true){
      this._modalFiltro.idSucursal=0
      this.blockLocalidad=1
    }else{
      this.blockLocalidad=0
    }
  }

  onRowSelect(x:any){
    const resultado = {
    direccion: x.data.direccion,
    nroLote:x.data.nroLote,
    sector:x.data.sector,
    sucursal:x.data.sucursal,
    idManzana:x.data.idManzana,
    nroSubLote:x.data.nroSubLote,
    departamento:x.data.departamento,
    provincia:x.data.provincia,
    distrito:x.data.distrito,
    propietario:x.data.propietario,
    unidadComercial:x.data.unidadComercial,
    unidadDomestica:x.data.unidadDomestica,
    unidadEstatal:x.data.unidadEstatal,
    unidadIndustrial:x.data.unidadIndustrial,
    unidadSocial:x.data.unidadSocial,
    estadoServicio:x.data.estadoServicio,
    idRutaLectura:x.data.idRutaLectura,
    ordenRutaLectura:x.data.ordenRutaLectura,
    idRutaReparto:x.data.idRutaReparto,
    ordenRutaReparto:x.data.ordenRutaReparto,
    tipoServicio:x.data.tipoServicio,
    tipoUsuario:x.data.tipoUsuario,
    tarifa:x.data.tarifa,
    nombres:x.data.nombres,
	  apellidos:x.data.apellidos,
	  razonSocial:x.data.razonSocial,
    idTipoServicio:x.data.idTipoServicio,
    idTipoDocIdentidad:x.data.idTipoDocIdentidad,
    nroDocIdentidad:x.data.nroDocIdentidad,
    idSede:x.data.idSede,
    sede:x.data.sede,
    nroSuministro:x.data.nroSuministro,

  };
  this.BusquedaCliente.emit(resultado);
  this.dialogForm=false;
  }


  onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
  ModalClose(){
    this._filtroCliente = [];
    this.blockTable = 0;
   }

}
