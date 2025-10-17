export class Solicitud{
	idEmpresa!:number 
    idSede!:number 
    idSucursal!:number 
    nroSuministro!:number 
    apellidos!:string
    nombres!:string
    razonSocial!:string
    idPersona:number | null = null;
    idTipoDocIdentidad!:string
    nroDocIdentidad!:string
    telefono!:string
    emai!:string
    idSector:number| null = null;
    idManzana!:string
    nroLote!:string
    nroSubLote!:string
    nombreRepresentante!:string
    idTipoDocIdentidadRepresentante!:string
    nroDocIdentidadRepresentante!:string
    direccionRepresentante !:string
    nroCalleRepresentante!:string
    mzaMunicipalRepresentante!:string
    loteMunicipalRepresentante!:string
    urbanizacionRepresentante!:string
    provinciaRepresentante!:string 
    distritoRepresentante!:string
    idDepartamentoRepresentante!:string
    idProvinciaRepresentante:string | null = null;
    idDistritoRepresentante:string | null = null;
    idTipoSolicitud!:number 
    idTipoServicio!:number 
    idTipoUsoConexion!:number 
    idDiametroAgua:number | null = null;
    idDiametroDesague:number | null = null;
    unidadDomestica:number | 0 = 0;
    unidadComercial:number | 0 = 0;
    unidadIndustrial:number | 0 = 0;
    unidadEstatal:number | 0 = 0;
    unidadSocial:number | 0 = 0;
    flagConexionTemporal: 0 | 1 = 0;
    nroMesesTemporal:number | null = null;
    direccion!:string
    nroCalle!:string
    nroInterior!:string
    referencia!:string
    mzaMunicipal!:string
    loteMunicipal!:string
    idCalle!:number 
    idUrbanizacion!:number 
    urbanizacion!:string
    idDepartamento!:string
    idProvincia!:string
    idDistrito!:string
    distrito!:string
    provincia!:string
    areaInmueble!:string
    areaConstruida!:string
    direccionCorrespondencia!:string
    nroCalleCorrespondencia!:string
    mzaCorrespondencia!:string
    nroLoteCorrespondencia!:string
    urbanizacionCorrespondencia!:string
    provinciaCorrespondencia!:string
    distritoCorrespondencia!:string
    idDepartamentoCorrespondencia:string| null = null;
    idProvinciaCorrespondencia:string | null = null;
    idDistritoCorrespondencia:string| null = null;
    idTipoDocumentoPropiedad!:number 
    nroParteRegistral!:string
    observacion!:string
    flagPresentaDocumentoPropiedad: 0 | 1 = 0;
    flagPresentaDocumentoIdentidad: 0 | 1 = 0;
    flagPresentaPlanoUbicacion: 0 | 1 = 0;
    flagPresentaPagoFactibilidad: 0 | 1 = 0;
    flagSisTratamientoDesague: 0 | 1 = 0;
    flagPlanoAlcantarillado: 0 | 1 = 0;
    flagServidumbrePactado: 0 | 1 = 0;
    flagConstanciaNoAdeudo: 0 | 1 = 0;
    flagViabilidadTecnica: 0 | 1 = 0;
    flagPuntosInternos: 0 | 1 = 0;
    flagAceptaFacturacionPago: 0 | 1 = 0;
    flagAceptaRealizarCorteTemporal: 0 | 1 = 0;
    flagPresentaLicenciaANA: 0 | 1 = 0;
    flagVigenciaPoder: 0 | 1 = 0;
    flagOtros: 0 | 1 = 0;
    flagClandestinoAgua: 0 | 1 = 0;
    flagClandestinoAlc: 0 | 1 = 0;
    latitud!:string
    longitud!:string
    ifOficina!:number   
    idTipoConstruccion!:number 
    motivoAnulacion!:string
    usuarioCreacion!:string
    flagNotificacionEmail: 0 | 1 = 0;
    //AGREGADOS
    flagRepresentante: 0 | 1 = 0;
    flagNotificaciones: 0 | 1 = 0;
    nroSolicitud!:number
    fechaSolicitud!:string
    idTipoEstadoPredio!:number
    idCalleCorrespondencia:number| null = null;
    idUrbanizacionCorrespondencia:number| null = null;
    tipodoc!:string
    seriedoc!:string
    nrodoc!:string

    calle!:string
    calleCorrespondencia!:string

    //BUSQUEDA LISTADO

    idSedeBsq!:number
    nrosolicitudBsq: string | null = null;
    nrodocumentoBsq: string | null = null;
    nrosuministroBsq: string | null = null;
    propietarioBsq: string | null = null;
}