import { ClienteCorte } from "./ClienteCorte";
import { RequierimientoColateral} from "./RequierimientoColateral";
import { Sector } from "./Sector";
import { TipoEstServicio } from "./TipoEstServicio";
import { TipoServicio } from "./TipoServicio";

export class DetallePadronCorte{

	idEmpresa: number | null = null;
  idCiclo: number | null = null;
  idSede: number | null = null;
  idSucursal: number | null = null;


  //ESTRUCUTRA CORTE 
  nroSuministro: number | null = null;
  propietario: string | null = null;



  //PARAMETROS SALIDA 
  item: number | null = null;
  idSector: number | null = null;
  idManzana: string | null = null;
  nroLote: string | null = null;
  nroSubLote: string | null = null;
  idRutaReparto: number | null = null;
  ordenRutaReparto: number | null = null;
  tipoServicio: string | null = null;
  
  codigoAlternativo: string | null = null;
  nroMedidor: string | null = null;
  nroDocIdentidad: string | null = null;
  
  idUrbanizacion: number | null = null;
  urbanizacion: string | null = null;
  estadoServicio: string | null = null;
  direccion2: string | null = null;
  nroCalle: string | null = null;
  nroInterior: string | null = null;
  referencia: string | null = null;
  tarifa: string | null = null;
  idTipoUsuario: number | null = null;
  fechaCorte: string | null = null;
  tipoCorte: string | null = null;
  nroMesesDeuda: number | null = null;
  nroMesesFraccionamiento: number | null = null;
  deudaCobrable: number | null = null;
  idTipoReporte: number | null = null;
  //AGREGADOS
  idEstadoServicio: number | null = null;
  anio: string | null = null;
  nombreMes: string | null = null;


	//GUARDAR CORTE
	idTipoOperacion: number | 1 = 1;
	idMotivoOperacion: number | null = null;
	descripcion: string | null = null;
	idService: number | null = null;
	fechacorteDpl: string | null = null;
	fechaLimite: string | null = null;
	fechaLimiteDpl: string | null = null;
  usuarioCreacion: string | null = null;
  observacion: string | null = null;
  lecturaCampo: number | null = null;

  idTipoCorteDesague: number | null = null;
  idTipoCorteAgua: number | null = null;
  coreAgua: number | null = null;
  coreAlca: number | null = null;
  idInspector: number | null = null;
  inspector: string | null = null;
  descripcionCorte: string | null = null;
  descripcionServis: string | null = null;
  idTipoEstServicio: number | null = null;
  fechaCorteCampo: string | null = null;
  fechaLimiteSolicitud: string | null = null;




}
