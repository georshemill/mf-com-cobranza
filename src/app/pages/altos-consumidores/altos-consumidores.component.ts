import { Component, OnInit } from '@angular/core';
import { GlobalSession } from '../utils/globalSession';
import { Localidad } from '../../models/Localidad';
import { CobranzaService } from '../../services/Cobranza.service';
import { FuncionesService } from '../../services/funciones.service';
import { MessageService } from 'primeng/api';
import { ParametrosModule } from '../parametros.module';
import { AltosConsumidores } from '../../models/AltosConsumidores';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-altos-consumidores',
    imports: [ParametrosModule],
  templateUrl: './altos-consumidores.component.html',
  styleUrl: './altos-consumidores.component.scss',
  providers: [CobranzaService]
})
export class AltosConsumidoresComponent implements OnInit{

  idEmpresaTk = GlobalSession.idEmpresa;
  idSedeTk = GlobalSession.idSede;
  usuarioTk = GlobalSession.usuario;
  idUsuarioTk = GlobalSession.idUsuario;
  

  urlView: string=""
  urlImpresion: string=""
  displayPDF:boolean=false
  _localidad:Localidad[] = []
  _localidadxSede:Localidad[] = []
  _gestionAltosConsu:AltosConsumidores=new AltosConsumidores
  _listAltosConsu:AltosConsumidores[] = []


  tabsPrincipal = [
    { title: 'Listado Altos Consumidores', value: "0", icon: 'pi pi-home'},
    //{ title: 'Listado Transferencia Catastro ', value: "1", icon: 'pi pi-user-edit' },
  ]

 constructor(private cobranzaService:CobranzaService,
     private funcionesService:FuncionesService,
     private messageService: MessageService) 
   {}


  ngOnInit(): void {
  
    this.init()
  }


  init(){

    //this._gestionCatastroModel.idEmpresa=this.idEmpresaTk
    //this._gestionAltosConsu.idSedeBsq=this.idSedeTk
    this._gestionAltosConsu.idSucursal=this.idSedeTk

    this.cobranzaService.dropdownLocalidadxSede(this.idSedeTk).subscribe((respuesta) => {
      this._localidadxSede=respuesta.data
    })

    this.cobranzaService.ConsultaParamae({idEmpresa: this.idEmpresaTk,idSede: this.idSedeTk,tipoParametro: "REPORTES",codigoParametro:"URL"}).subscribe(data => {
      this.urlImpresion= data.data.valorParametro
    });

    this.cobranzaService.ListarAltosConsumidores({idEmpresa:this.idEmpresaTk,idSede:this.idSedeTk,idSucursal:this._gestionAltosConsu.idSucursal}).subscribe((respuesta) => {
      this._listAltosConsu=respuesta.data
    })
  }


  detalle(x:any){
    this.urlView=`${this.urlImpresion}/cobranza/altoconCliente.php?idempresa=1&idsede=${this.idSedeTk}&idsucursal=${this._gestionAltosConsu.idSucursal}&nrosuministro=${x.nroSuministro}` ;
    this.displayPDF=true
  }

  parqueMedidores(){

    this.urlView=`${this.urlImpresion}/cobranza/altoconMedidor.php?idempresa=1&idsede=${this.idSedeTk}&idsucursal=${this._gestionAltosConsu.idSucursal}` ;
    this.displayPDF=true

  }
  
  imprimirPadron(){

    this.urlView=`${this.urlImpresion}/cobranza/altoconClientes.php?idempresa=1&idsede=${this.idSedeTk}&idsucursal=${this._gestionAltosConsu.idSucursal}` ;
    this.displayPDF=true

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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }






}
