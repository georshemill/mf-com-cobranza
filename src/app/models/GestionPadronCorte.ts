import { ClienteCorte } from "./ClienteCorte";
import { RequierimientoColateral} from "./RequierimientoColateral";
import { Sector } from "./Sector";
import { TipoEstServicio } from "./TipoEstServicio";
import { TipoServicio } from "./TipoServicio";

export class GestionPadronCorte{

	idEmpresa: number | null = null;
  idCiclo: number | null = null;
  idSede: number | null = null;
  idSucursal: number | null = null;
	sectorList:Sector[] = []
	tipoServicioList:TipoServicio[] = []
	estadoServicioList:TipoEstServicio[] = []
  clienteList:ClienteCorte[] = []


  rangoMesesInicial: number | 2 = 2;
  rangoMesesFinal: number | 99999 = 99999;
  importeInicial: number | 0 = 0;
  importeFinal: number | 99999 = 99999;
  incluyeRefinanciamiento: 0 | 1 = 0;
  idOrdenamiento: number | 0 = 0;
  //PARAMETROS SALIDA 
  item: number | null = null;
  idSector: number | null = null;
  idManzana: string | null = null;
  nroLote: string | null = null;
  nroSubLote: string | null = null;
  idRutaReparto: number | null = null;
  ordenRutaReparto: number | null = null;
  tipoServicio: string | null = null;
  nroSuministro: number | null = null;
  codigoAlternativo: string | null = null;
  nroMedidor: string | null = null;
  nroDocIdentidad: string | null = null;
  propietario: string | null = null;
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


	//GUARDAR CORTE
	idTipoOperacion: number | 1 = 1;
	idMotivoOperacion: number | null = null;
	descripcion: string | null = null;
	idService: number | null = null;
	fechaInicio: string | null = null;
	fechaInicioDpl: string | null = null;
	fechaLimite: string | null = null;
	fechaLimiteDpl: string | null = null;
  usuarioCreacion: string | null = null;




}
