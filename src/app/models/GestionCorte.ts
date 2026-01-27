import { ClienteCorte } from "./ClienteCorte";
import { DetallePadronCorte } from "./DetallePadronCorte";
import { RequierimientoColateral} from "./RequierimientoColateral";
import { Sector } from "./Sector";
import { TipoEstServicio } from "./TipoEstServicio";
import { TipoServicio } from "./TipoServicio";

export class GestionCorte{

  //PARAMETROS DE ENTRADA 
	idEmpresa: number | null = null;
  idSede: number | null = null;
  idSucursal: number | null = null;
  //PARAMETROS SALIDA 
  idSector: number | null = null;              
  idManzana: number | null = null;
  nroSuministro: number | null = null;
  propietario: string | null = null;           
  fechaProrroga: string | null = null;          
  fechaCorte: string | null = null;             
  fechaReapertura: string | null = null;        
  deudaCobrable: number | null = null;    
  deudaTotal: number | null = null;     
  deudaEnReclamo: number | null = null;       
  nroMesesDeuda: number | null = null;       
  nroMesesFraccionamiento: number | null = null;
  idEstadoServicio: number | null = null;  
  estadoServicio: string | null = null;     
  //PARA GUARDAR 
  tipoCorteAguaCabecera: number | null = null;
  tipoCorteDesCab: number | null = null;
  //tipoCorteAgua: number | null = null;
  coreAguaCabecera: number | null = null;
  coreAlcaCabecera: number | null = null;
  codInspectorCabecera: number | null = null;
  inspectorCabecera: string | null = null;
  descripcionCorteCab: string | null = null;
  descripcionServisCab: string | null = null;
  idServiceCab: number | null = null;
  idTipoEstServicioCab: number | null = null;
  idMotivoOperacionCab: number | null = null;
  fechacorteDpl: string | null = null;
  anio: string | null = null;
  nombreMes: string | null = null;
  coreList:DetallePadronCorte[] = []
  usuarioCreacion:string | null = null;
  fechaLimiteDpl: string | null = null;

  //PARA REAPERTURA
  nroOrdenCore: number | null = null;
  idMotivoOperacion: number | null = null;
  idService: number | null = null;

	//GUARDAR CORTE
	/*idTipoOperacion: number | 1 = 1;
	idMotivoOperacion: number | null = null;
	descripcion: string | null = null;
	
	fechaInicio: string | null = null;
	
	fechaLimite: string | null = null;
	
  usuarioCreacion: string | null = null;*/




}
