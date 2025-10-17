import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { ParametrosModule } from '../../pages/parametros.module';
import { TipoDocumento } from '../../models/TipoDocumento';
import { Localidad } from '../../models/Localidad';
import { FiltroCliente } from '../../models/FiltroCliente';
import { FuncionesService } from '../../services/funciones.service';
import { Table } from 'primeng/table';
import { ComercializacionService } from '../../services/Cobranza.service';

@Component({
  selector: 'app-panel-busqueda',
  standalone: true,
  imports: [ParametrosModule],
  templateUrl: './panel-busqueda.component.html',
  styleUrl: './panel-busqueda.component.scss',
  providers: [ComercializacionService]
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

  constructor(private catastroService:ComercializacionService,
              private funcionesService:FuncionesService,
        
    ) 
    {}

  ngOnInit(): void {
    this.init()
  }

  

  init(){ 
    this.catastroService.dropdownLocalidad().subscribe((respuesta) => {
      this._localidad=respuesta.data
    })
  }

  Busqueda(){

    this._modalFiltro.idEmpresa=1

    this.catastroService.BusquedaCliente(this._modalFiltro).subscribe({
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
    nroDocIdentidad:x.data.nroDocIdentidad

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
