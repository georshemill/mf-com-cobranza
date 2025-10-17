import { RequierimientoColateral } from "./RequierimientoColateral"

export class TipoSolicitud{
	/*idEmpresa!:number 
	idTipoSolicitudConexion!:number 
	
	orden!:number 
	usuarioCreacion!:string
	fechaRegistro!:string
	estado!:boolean 
	tipo!:string*/
	idServicioColateral!:number 
	descripcion !:string
	conceptoColateral!:string 
	flagM3!:number 
	flagOtros!:number 
	requisitosList:RequierimientoColateral[] = []

}