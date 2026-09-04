
export class GestionCuadre{

	idEmpresa: number =1;
	idSede: number | null = null;
	idSucursal: number | null = null;
	usuarioCreacion: string | null = null;
	cajero: string | null = null;
	car!:number
	
	//ULTIMO
	idSedeBsq!:number
	fechaDpl: string | null = null;
	fecha: string | null = null;
	fechaIni: string | null = null;
	fechaDplFin: string | null = null;
	fechaFin: string | null = null;
	idCar!:number

	//MODEL POR BUSQUEDA X TIPO
	idTipoDeuda!:number
	importe!:number
    cantidad!:number
    tipoDeuda!: string //| null = null;
	
	//MODEL POR BUSQUEDA X SEDE
	impTotal!:number
    nroTransacciones!:number
    anulado!:number
    nombreSede!:string

	//MODEL POR BUSQUEDA X FORMA
	idFormaPago!:number
    formaPago!:string

	//MODEL POR BUSQUEDA X COMPROBANTE
    tipoComprobante!:string
    idTipoComprobante!:number
    serieDoc!:string


	//MODEL REPORTE RECAUDACION X FECHA
	nroPlanilla!:string
	nombreCar!:string
	diaPago!:string
	impAgua!:number
	impAlcantarillado!:number
	impCargoFijo!:number
	impInteres!:number
	impOtrosConceptos!:number
	impIGV!:number
	redondeoAnterior!:number
	redondeoActual!:number
	impTotalMes!:number
	impCanje!:number
	
}