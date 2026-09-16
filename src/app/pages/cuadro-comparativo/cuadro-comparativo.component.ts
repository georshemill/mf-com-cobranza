import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { Calendario } from '../../models/Calendario';
import { Ciclo } from '../../models/Ciclo';
import { Localidad } from '../../models/Localidad';
import { ListResponse } from '../../responses/ListResponse';
import { FuncionesService } from '../../services/funciones.service';
import { ParametrosModule } from '../parametros.module';
import { GlobalSession } from '../utils/globalSession';
import { CobranzaService } from '../../services/Cobranza.service';
import { Reporteador } from '../../models/Reporteador';

@Component({
  selector: 'app-cuadro-comparativo',
  imports: [ParametrosModule],
  templateUrl: './cuadro-comparativo.component.html',
  styleUrl: './cuadro-comparativo.component.scss',
  providers: [CobranzaService]
})
export class CuadroComparativoComponent {

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
  
  

  constructor(private catastroService:CobranzaService,
    private funcionesService:FuncionesService,
    private messageService: MessageService) 
  {     }
  
  
  ngOnInit(): void {
    this.init()
  }

  init(){ 
  
    this.catastroService.dropdownLocalidadXsede(this.idSedeTk).pipe(
          map((resp: ListResponse<Localidad[]>) => [
              {idSucursal: 0,idCiclo:0, descripcion: 'TODOS'},
              ...(resp.data ?? [])  ])
          ).subscribe((data: Localidad[]) => {
          this._localidad = data;
        });

    this.catastroService.dropdownCiclo(this.idSedeTk).subscribe((respuesta) => {
      this._ciclo = respuesta.data;
    });

    this.catastroService.ConsultaParamae({idEmpresa: this.idEmpresaTk,idSede: this.idSedeTk,tipoParametro: "REPORTES",codigoParametro:"URL"}).subscribe(data => {
      this.urlImpresion= data.data.valorParametro
    });


  }

  changeCiclo(x:any){

    this.catastroService.dropdownAnio(x).subscribe((respuesta) => {
      this._anioXciclo = respuesta.data;
    });

  }

  changeAnio(x:any){

    this.catastroService.dropdownMes(this._facMensualModel.idCiclo!,x).subscribe((respuesta) => {
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

    this.blockFiltro=1
 

    //this.urlView=`${this.urlImpresion}/facturacion/registroVentas.php?idempresa=1&idsede=${this.idSedeTk}&idsucursal=&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
    //this.displayPDF=true
  }

  viewPadron(){
    this.urlView=`${this.urlImpresion}/saldos/analisisSaldo.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
    this.displayPDF=true
  }

  viewExcel(){
    const url = `${this.urlImpresion}/facturacion/PadronClientes.php?idempresa=1&idsede=${this.idSedeTk}&idsucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&mes=${this._facMensualModel.mes}`;

  const link = document.createElement('a');
  link.href = url;
  //link.download = 'PadronClientes.xlsx'; // opcional
  link.click();
  }

  viewExcelMedidor(){

    const url = `${this.urlImpresion}/facturacion/PadronClientesSinMedidor.php?idempresa=1&idsede=${this.idSedeTk}&idsucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&mes=${this._facMensualModel.mes}`;

  const link = document.createElement('a');
  link.href = url;
  link.click();
  }
  
  viewPadronPDF(){
    this.urlView=`${this.urlImpresion}/saldos/analisisSaldo.php?IdEmpresa=1&IdSede=${this.idSedeTk}&IdSucursal=${this._facMensualModel.idSucursal}&Anio=${this._facMensualModel.anio}&Mes=${this._facMensualModel.mes}` ;
    this.displayPDF=true
  }

  
  estadistico(){
    //http://apisistemas.ddns.net/comercialWEB/catastro/cuadroResumenXPeriodo_02.php?idempresa=1&idsede=3&anio=2026&mes=3&idsucursal=3
    this.urlView=`${this.urlImpresion}/catastro/cuadroResumenXPeriodo_02.php?idempresa=1&idsede=${this.idSedeTk}&anio=${this._facMensualModel.anio}&mes=${this._facMensualModel.mes}&idsucursal=${this._facMensualModel.idSucursal}` ;
    this.displayPDF=true
  }



}



