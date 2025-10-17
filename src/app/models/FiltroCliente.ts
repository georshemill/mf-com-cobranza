export class FiltroCliente{
	idEmpresa!:number
	idCiclo!:number
	ciclo!:string
	idSede!:number
	sede!:string
	idSucursal!:number
	sucursal!:string
	idSector!:number
	sector!:string
	idManzana!:string
	manzana!:string
	nroLote!:string
	nroSubLote!:string
	idRutaLectura!:number
	ordenRutaLectura!:number
	idRutaReparto!:number
	ordenRutaReparto!:number
	codigoCatastral!:string
	idTipoServicio!:number
	tipoServicio!:string
	nroSuministro: number | null = null;
	nroMedidor: number | null = null;
	nroDocIdentidad!:string
	propietario!:string
	encargado!:string
	idTipoEstadoServicio!:number
	estadoServicio!:string
	idCalle!:number
	direccion!:string
	idTarifa!:number
	tarifa!:string
	fechaProrroga!:string
	flagTransferido!:boolean
	fechaTransferencia!:string
	idTipoUsuario!:string
	tipoUsuario!:string
	recibo!:string
	codigoAntiguo!:string
	referencia!:string
	urbanizacion!:string
	idDepartamento!:number 
	idProvincia!:string
	idDistrito!:string
	direccion2!:string
	nroCalle!:string
	checkSucursal!:boolean
	departamento!:string
	provincia!:string
	distrito!:string
	unidadComercial!:number
	unidadDomestica!:number
	unidadEstatal!:number
	unidadIndustrial!:number
	unidadSocial!:number

	//AGREGADOS 
	nombres!:string
	apellidos!:string
	razonSocial!:string
	idTipoDocIdentidad!:string


}
