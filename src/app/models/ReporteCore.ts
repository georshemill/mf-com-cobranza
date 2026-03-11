import { ClienteCorte } from "./ClienteCorte";
import { DetallePadronCorte } from "./DetallePadronCorte";
import { RequierimientoColateral} from "./RequierimientoColateral";
import { Sector } from "./Sector";
import { TipoEstServicio } from "./TipoEstServicio";
import { TipoServicio } from "./TipoServicio";

export class ReporteCore{

  //PARAMETROS DE ENTRADA 
	idEmpresa: number | null = null;
  idSede: number | null = null;
  idSucursal: number | null = null;

  nroOrdenCore: number | null = null;      
  idTipoOperacion: number | null = null;      
  descripcion:string | null = null;
  fechaDesdeDpl:string | null = null;
  fechaDesde:string | null = null;
  fechaHasta:string | null = null;
  fechaHastaDpl:string | null = null;

  //PARAMETROS DE SALIDA 
  idSector: number | null = null;                   
  IdManzana:string | null = null;              
  nroSuministro: number | null = null;                
  Propietario:string | null = null; 
  Direccion:string | null = null;            
  FechaProrroga:string | null = null;          
  FechaCorte:string | null = null;             
  FechaReapertura:string | null = null;          
  
  idCiclo: number | null = null;      
  ciclo:string | null = null;      
  sucursal:string | null = null;
  sector:string | null = null;
  nroOrdenCoRe:string | null = null;
  tipoOperacion:string | null = null;
  idTipoMotivoOperacion: number | null = null;      
  motivoOperacion:string | null = null;
  idService:string | null = null;
  service:string | null = null;
  razonSocial:string | null = null;
  rUC:string | null = null;
  fechaInicio:string | null = null;
  fechaLimite:string | null = null;
  incluyeRefinanciamiento:string | null = null;
  rangoImporteInicial:string | null = null;
  rangoImporteFinal:string | null = null;
  rangoMesesInicial:string | null = null;
  rangoMesesFinal:string | null = null;
  usuarioCreacion:string | null = null;
  fechaRegistro:string | null = null;

}
