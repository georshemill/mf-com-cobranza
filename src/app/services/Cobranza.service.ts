import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ListResponse } from '../responses/ListResponse';
import { GestionCatastro } from '../models/GestionCatastro';
import { Mensaje } from '../responses/Mensaje';
import { Localidad } from '../models/Localidad';
import { Departamento } from '../models/Departamento';
import { Provincia } from '../models/Provincia';
import { Distrito } from '../models/Distrito';
import { Sector } from '../models/Sector';
import { Manzanas } from '../models/Manzanas';
import { FichaIncompleta } from '../models/FichaIncompleta';
import { TipoPredio } from '../models/TipoPredio';
import { TipoConstruccion } from '../models/TipoConstruccion';
import { TipoAbastecimiento } from '../models/TipoAbastecimiento';
import { TipoAlmacenaje } from '../models/TipoAlmacenaje';
import { Rutas } from '../models/Rutas';
import { TipoCorrespondencia } from '../models/TipoCorrespondencia';
import { CentroPoblado } from '../models/CentroPoblado';
import { Urbanizacion } from '../models/Urbanizacion';
import { TipoDocumento } from '../models/TipoDocumento';
import { TipoServicio } from '../models/TipoServicio';
import { TipoUsuario } from '../models/TipoUsuario';
import { TipoActividad } from '../models/TipoActividad';
import { Tarifas } from '../models/Tarifas';
import { TipoResponsable } from '../models/TipoResponsable';
import { TipoMaterialTubo } from '../models/TipoMaterialTubo';
import { TipoAccesorios } from '../models/TipoAccesorios';
import { TipoDiametros } from '../models/TipoDiametros';
import { TipoEstadoConexion } from '../models/TipoEstadoConexion';
import { TipoAccesorioNoReglamentario } from '../models/TipoAccesorioNoReglamentario';
import { TipoPavimento } from '../models/TipoPavimento';
import { TipoCorteServicio } from '../models/TipoCorteServicio';
import { TipoVereda } from '../models/TipoVereda';
import { TipoFugas } from '../models/TipoFugas';
import { TipoLlavesMedidor } from '../models/TipoLlavesMedidor';
import { TipoModeloCajaConex } from '../models/TipoModeloCajaConex';
import { TipoLocalizaCaja } from '../models/TipoLocalizaCaja';
import { TipoMaterialCaja } from '../models/TipoMaterialCaja';
import { TipoEstadoCaja } from '../models/TipoEstadoCaja';
import { TipoEstadoTapa } from '../models/TipoEstadoTapa';
import { TipoTapa } from '../models/TipoTapa';
import { TipoFacturacion } from '../models/TipoFacturacion';
import { EstadoMedidor } from '../models/EstadoMedidor';
import { TipoEstadoLectura } from '../models/TipoEstadoLectura';
import { MarcaMedidor } from '../models/MarcaMedidor';
import { ModeloMedidor } from '../models/ModeloMedidor';
import { ModeloHomologacion } from '../models/ModeloHomologacion';
import { TipoMedidor } from '../models/TipoMedidor';
import { PosicionMedidor } from '../models/PosicionMedidor';
import { CapacidadMedidor } from '../models/medidor/CapacidadMedidor';
import { TipoLectura } from '../models/TipoLectura';
import { TipoResultadoVerifMedidor } from '../models/medidor/TipoResultadoVerifMedidor';
import { TipoSituacionMedidor } from '../models/medidor/TipoSituacionMedidor';
import { TipoClaseMetrologica } from '../models/medidor/TipoClaseMetrologica';
import { TipoVerificacionMedidor } from '../models/medidor/TipoVerificacionMedidor';
import { Personas } from '../models/Personas';
import { FiltroCliente } from '../models/FiltroCliente';
import { TipoTramiteIngreso } from '../models/TipoTramiteIngreso';
import { TipoIngresoConexion } from '../models/TipoIngresoConexion';
import { TipoPiscina } from '../models/TipoPiscina';
import { Calles } from '../models/Calles';
import { SearchCorrespondencia } from '../models/SearchCorrespondencia';
import { ZonaAbastecimiento } from '../models/ZonaAbastecimiento';
import { TipoPresion } from '../models/TipoPresion';
import { TipoEstadoPredio } from '../models/TipoEstadoPredio';
import { TipoSolicitud } from '../models/TipoSolicitud';
import { TipoConexion } from '../models/TipoConexion';
import { GestionSolicitud } from '../models/GestionSolicitud';
import { Solicitud } from '../models/solicitud-conexion/Solicitud';
import { Sede } from '../models/Sede';
import { Oficina } from '../models/Oficina';

import { TipoEstServicio } from '../models/TipoEstServicio';
import { Ciclo } from '../models/Ciclo';
import { GestionPadronCorte } from '../models/GestionPadronCorte';
import { TipOrdenamiento } from '../models/TipOrdenamiento';
import { Servis } from '../models/Servis';
import { TipoMotivOpe } from '../models/TipoMotivOpe';
import { GestionCorte } from '../models/GestionCorte';
import { Inspector } from '../models/Inspector';
import { TipoCorte } from '../models/TipoCorte';
import { Paramae } from '../models/Paramae';



@Injectable({
    providedIn: 'root'
})
export class CobranzaService {

    private url = `${environment.HOST_API}CatastroClientes`;

    constructor(private http: HttpClient) {
    }

    listar(): Observable<ListResponse<GestionCatastro[]>> {
        return this.http.get<ListResponse<GestionCatastro[]>>(`${this.url}`);
    }

    crud(model: GestionCatastro,op: number): Observable<Mensaje> {
        return this.http.post<Mensaje>(`${this.url}/${op}`, model);
    }

    listaCliente(model: GestionCatastro): Observable<ListResponse<GestionCatastro[]>> {
        return this.http.post<ListResponse<GestionCatastro[]>>(`https://gateway8053.emapasalas.net.pe/CatastroClientes/ListClientes`,model);
    }

    dropdownLocalidad(): Observable<ListResponse<Localidad[]>> {
            return this.http.get<ListResponse<Localidad[]>>(`https://gateway1.emapasalas.net.pe/Localidad/dropdown`);
    }

    dropdownDepartamento(): Observable<ListResponse<Departamento[]>> {
        return this.http.get<ListResponse<Departamento[]>>(`https://gateway1.emapasalas.net.pe/Departamento/dropdown`);
    }

    dropdownProvincia(idprovincia: string): Observable<ListResponse<Provincia[]>> {
        return this.http.get<ListResponse<Provincia[]>>(`https://gateway1.emapasalas.net.pe/Provincia/dropdown/${idprovincia}`);
    }

    dropdownSede(): Observable<ListResponse<Sede[]>> {
        return this.http.get<ListResponse<Sede[]>>(`https://gateway1.emapasalas.net.pe/Sede/dropdown`);
    }

    dropdownDistrito(idepartamento: string,idprovincia: string): Observable<ListResponse<Distrito[]>> {
        return this.http.get<ListResponse<Distrito[]>>(`https://gateway1.emapasalas.net.pe/Distrito/dropdown/${idepartamento}/${idprovincia}`);
    }

    dropdownSecxLocalidad(idlocalidad: number,): Observable<ListResponse<Sector[]>> {
        return this.http.get<ListResponse<Sector[]>>(`https://gateway1.emapasalas.net.pe/Sector/dropdown/${idlocalidad}`);
    }

    dropdownSecxCiclo(idlocalidad: number,idsector: number): Observable<ListResponse<Sector[]>> {
        return this.http.get<ListResponse<Sector[]>>(`https://gateway1.emapasalas.net.pe/Sector/dropdown/${idlocalidad}/${idsector}`);
    }

    dropdownSecOperaxLocalidad(idlocalidad: number,): Observable<ListResponse<Sector[]>> {
        return this.http.get<ListResponse<Sector[]>>(`https://gateway1.emapasalas.net.pe/Sector/Operacional/dropdown/${idlocalidad}`);
    }

    dropdownManzanas(idlocalidad: number,idsector: number): Observable<ListResponse<Manzanas[]>> {///dropdown/{idLocalidad}/{idSector}
        return this.http.get<ListResponse<Manzanas[]>>(`https://gateway1.emapasalas.net.pe/Manzanas/dropdown/${idlocalidad}/${idsector}`);
    }

    dropdownFichaIncompleta(): Observable<ListResponse<FichaIncompleta[]>> {
        return this.http.get<ListResponse<FichaIncompleta[]>>(`https://gateway1.emapasalas.net.pe/TipoFicha/dropdown`);
    }

    dropdownTipoPredio(): Observable<ListResponse<TipoPredio[]>> {
        return this.http.get<ListResponse<TipoPredio[]>>(`https://gateway1.emapasalas.net.pe/TipoPredio/dropdown`);
    }

    dropdownTipoConstruccion(): Observable<ListResponse<TipoConstruccion[]>> {
        return this.http.get<ListResponse<TipoConstruccion[]>>(`https://gateway1.emapasalas.net.pe/TipoConstruccion/dropdown`);
    }

    dropdownTipoAbastecimineto(): Observable<ListResponse<TipoAbastecimiento[]>> {
        return this.http.get<ListResponse<TipoAbastecimiento[]>>(`https://gateway1.emapasalas.net.pe/TipoAbastecimiento/dropdown`);
    }

    dropdownTipoAlmacenaje(): Observable<ListResponse<TipoAlmacenaje[]>> {
        return this.http.get<ListResponse<TipoAlmacenaje[]>>(`https://gateway1.emapasalas.net.pe/TipoAlmacenaje/dropdown`);
    }

    dropdownRutaLectura(idsucursal: number,idsector: number,idManzana: number): Observable<ListResponse<Rutas[]>> {
        return this.http.get<ListResponse<Rutas[]>>(`https://gateway1.emapasalas.net.pe/Rutas/Lectura/dropdown/${idsucursal}/${idsector}/${idManzana}`);
    }

    dropdownRutaDistribucion(idsucursal: number,idsector: number,idManzana: number): Observable<ListResponse<Rutas[]>> {
        return this.http.get<ListResponse<Rutas[]>>(`https://gateway1.emapasalas.net.pe/Rutas/Distribucion/dropdown/${idsucursal}/${idsector}/${idManzana}`);
    }

    dropdownTipoCorrespondencia(): Observable<ListResponse<TipoCorrespondencia[]>> {
        return this.http.get<ListResponse<TipoCorrespondencia[]>>(`https://gateway1.emapasalas.net.pe/TipoCorrespondencia/dropdown`);
    }

    dropdownCentroPoblado(idsucursal: number): Observable<ListResponse<CentroPoblado[]>> {
        return this.http.get<ListResponse<CentroPoblado[]>>(`https://gateway1.emapasalas.net.pe/CentroPoblado/dropdown/${idsucursal}`);
    }

    dropdownUrbanizacion(idsucursal: number): Observable<ListResponse<Urbanizacion[]>> {
        return this.http.get<ListResponse<Urbanizacion[]>>(`https://gateway1.emapasalas.net.pe/Urbanizacion/dropdown/${idsucursal}`);
    }

    dropdownTipodocumento(): Observable<ListResponse<TipoDocumento[]>> {
        return this.http.get<ListResponse<TipoDocumento[]>>(`https://gateway1.emapasalas.net.pe/TipoDocIdent/dropdown`);
    }

    dropdownTipoServicio(): Observable<ListResponse<TipoServicio[]>> {
        return this.http.get<ListResponse<TipoServicio[]>>(`https://gateway1.emapasalas.net.pe/TipoServicio/dropdown`);
    }

    dropdownTipoUsuario(): Observable<ListResponse<TipoUsuario[]>> {
        return this.http.get<ListResponse<TipoUsuario[]>>(`https://gateway1.emapasalas.net.pe/TipoUsuario/dropdown`);
    }

    dropdownTipoActividad(): Observable<ListResponse<TipoActividad[]>> {
        return this.http.get<ListResponse<TipoActividad[]>>(`https://gateway1.emapasalas.net.pe/TipoActividad/dropdown`);
    }

    dropdownTarifas(idsucursal: number): Observable<ListResponse<Tarifas[]>> {
        return this.http.get<ListResponse<Tarifas[]>>(`https://gateway1.emapasalas.net.pe/Tarifas/dropdown/${idsucursal}`);
    }

    dropdownTipoResponsable(): Observable<ListResponse<TipoResponsable[]>> {
        return this.http.get<ListResponse<TipoResponsable[]>>(`https://gateway1.emapasalas.net.pe/TipoResponsable/dropdown`);
    }

    dropdownTipoMaterialTubo(idTipoConexion: number): Observable<ListResponse<TipoMaterialTubo[]>> {
        return this.http.get<ListResponse<TipoMaterialTubo[]>>(`https://gateway1.emapasalas.net.pe/TipoMaterialTubo/dropdown/${idTipoConexion}`);
    }

    dropdownTipoAccesorios(idTipoConexion: number): Observable<ListResponse<TipoAccesorios[]>> {
        return this.http.get<ListResponse<TipoAccesorios[]>>(`https://gateway1.emapasalas.net.pe/TipoAccesorio/dropdown/${idTipoConexion}`);
    }

    dropdownDiametros(idTipoConexion: number): Observable<ListResponse<TipoDiametros[]>> {
        return this.http.get<ListResponse<TipoDiametros[]>>(`https://gateway1.emapasalas.net.pe/TipoDiametros/dropdown/${idTipoConexion}`);
    }

    dropdownTipoEstConexion(idTipoConexion: number): Observable<ListResponse<TipoEstadoConexion[]>> {
        return this.http.get<ListResponse<TipoEstadoConexion[]>>(`https://gateway1.emapasalas.net.pe/TipoEstConexion/dropdown/${idTipoConexion}`);
    }

    dropdownTipoAccesorioNoReglamentario(idTipoConexion: number): Observable<ListResponse<TipoAccesorioNoReglamentario[]>> {
        return this.http.get<ListResponse<TipoAccesorioNoReglamentario[]>>(`https://gateway1.emapasalas.net.pe/TipoAccesorioNoReglamentario/dropdown/${idTipoConexion}`);
    }

    dropdownTipoPavimento(idTipoConexion: number): Observable<ListResponse<TipoPavimento[]>> {
        return this.http.get<ListResponse<TipoPavimento[]>>(`https://gateway1.emapasalas.net.pe/TipoPavimento/dropdown/${idTipoConexion}`);
    }

    dropdownTipoCorteServicio(idTipoConexion: number): Observable<ListResponse<TipoCorteServicio[]>> {
        return this.http.get<ListResponse<TipoCorteServicio[]>>(`https://gateway1.emapasalas.net.pe/TipoCorteServicio/dropdown/${idTipoConexion}`);
    }

    dropdownTipoVereda(idTipoConexion: number): Observable<ListResponse<TipoVereda[]>> {
        return this.http.get<ListResponse<TipoVereda[]>>(`https://gateway1.emapasalas.net.pe/TipoVereda/dropdown/${idTipoConexion}`);
    }

    dropdownTipoFugas(idTipoConexion: number): Observable<ListResponse<TipoFugas[]>> {
        return this.http.get<ListResponse<TipoFugas[]>>(`https://gateway1.emapasalas.net.pe/TipoFugas/dropdown/${idTipoConexion}`);
    }

    dropdownTipoModeloCajaConex(idTipoConexion: number): Observable<ListResponse<TipoModeloCajaConex[]>> {
        return this.http.get<ListResponse<TipoModeloCajaConex[]>>(`https://gateway1.emapasalas.net.pe/TipoModeloCajaConex/dropdown/${idTipoConexion}`);
    }

    dropdownTipollaveMedidor(): Observable<ListResponse<TipoLlavesMedidor[]>> {
        return this.http.get<ListResponse<TipoLlavesMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipollaveMedidor/dropdown`);
    }

    dropdownTipoLocalizacionCaja(idTipoConexion: number): Observable<ListResponse<TipoLocalizaCaja[]>> {
        return this.http.get<ListResponse<TipoLocalizaCaja[]>>(`https://gateway1.emapasalas.net.pe/TipoLocalizacionCaja/dropdown/${idTipoConexion}`);
    }

    dropdownTipoCaja(idTipoConexion: number): Observable<ListResponse<TipoMaterialCaja[]>> {
        return this.http.get<ListResponse<TipoMaterialCaja[]>>(`https://gateway1.emapasalas.net.pe/TipoCaja/dropdown/${idTipoConexion}`);
    }

    dropdownTipoEstadoCaja(idTipoConexion: number): Observable<ListResponse<TipoEstadoCaja[]>> {
        return this.http.get<ListResponse<TipoEstadoCaja[]>>(`https://gateway1.emapasalas.net.pe/TipoEstCaja/dropdown/${idTipoConexion}`);
    }

    dropdownTipoEstadoTapa(idTipoConexion: number): Observable<ListResponse<TipoEstadoTapa[]>> {
        return this.http.get<ListResponse<TipoEstadoTapa[]>>(`https://gateway1.emapasalas.net.pe/TipoEstTapa/dropdown/${idTipoConexion}`);
    }

    dropdownTipoTapa(idTipoConexion: number): Observable<ListResponse<TipoTapa[]>> {
        return this.http.get<ListResponse<TipoTapa[]>>(`https://gateway1.emapasalas.net.pe/TipoTapa/dropdown/${idTipoConexion}`);
    }


    dropdownTipoFugasAlcan(idTipoConexion: number): Observable<ListResponse<TipoFugas[]>> {
        return this.http.get<ListResponse<TipoFugas[]>>(`https://gateway1.emapasalas.net.pe/TipoFugas/dropdown/${idTipoConexion}`);
    }

    dropdownTipoMaterialTuboAlcan(idTipoConexion: number): Observable<ListResponse<TipoMaterialTubo[]>> {
        return this.http.get<ListResponse<TipoMaterialTubo[]>>(`https://gateway1.emapasalas.net.pe/TipoMaterialTubo/dropdown/${idTipoConexion}`);
    }

    dropdownDiametrosAlcan(idTipoConexion: number): Observable<ListResponse<TipoDiametros[]>> {
        return this.http.get<ListResponse<TipoDiametros[]>>(`https://gateway1.emapasalas.net.pe/TipoDiametros/dropdown/${idTipoConexion}`);
    }

    dropdownTipoEstConexionAlcan(idTipoConexion: number): Observable<ListResponse<TipoEstadoConexion[]>> {
        return this.http.get<ListResponse<TipoEstadoConexion[]>>(`https://gateway1.emapasalas.net.pe/TipoEstConexion/dropdown/${idTipoConexion}`);
    }

    dropdownTipoCorteServicioAlcan(idTipoConexion: number): Observable<ListResponse<TipoCorteServicio[]>> {
        return this.http.get<ListResponse<TipoCorteServicio[]>>(`https://gateway1.emapasalas.net.pe/TipoCorteServicio/dropdown/${idTipoConexion}`);
    }

    dropdownTipoPavimentoAlcan(idTipoConexion: number): Observable<ListResponse<TipoPavimento[]>> {
        return this.http.get<ListResponse<TipoPavimento[]>>(`https://gateway1.emapasalas.net.pe/TipoPavimento/dropdown/${idTipoConexion}`);
    }

    dropdownTipoVeredaAlcan(idTipoConexion: number): Observable<ListResponse<TipoVereda[]>> {
        return this.http.get<ListResponse<TipoVereda[]>>(`https://gateway1.emapasalas.net.pe/TipoVereda/dropdown/${idTipoConexion}`);
    }

    dropdownTipoModeloCajaAlcan(idTipoConexion: number): Observable<ListResponse<TipoModeloCajaConex[]>> {
        return this.http.get<ListResponse<TipoModeloCajaConex[]>>(`https://gateway1.emapasalas.net.pe/TipoModeloCajaConex/dropdown/${idTipoConexion}`);
    }

    dropdownTipoLocalizacionCajaAlcan(idTipoConexion: number): Observable<ListResponse<TipoLocalizaCaja[]>> {
        return this.http.get<ListResponse<TipoLocalizaCaja[]>>(`https://gateway1.emapasalas.net.pe/TipoLocalizacionCaja/dropdown/${idTipoConexion}`);
    }

    dropdownTipoCajaAlcan(idTipoConexion: number): Observable<ListResponse<TipoMaterialCaja[]>> {
        return this.http.get<ListResponse<TipoMaterialCaja[]>>(`https://gateway1.emapasalas.net.pe/TipoCaja/dropdown/${idTipoConexion}`);
    }

    dropdownTipoEstadoCajaAlcan(idTipoConexion: number): Observable<ListResponse<TipoEstadoCaja[]>> {
        return this.http.get<ListResponse<TipoEstadoCaja[]>>(`https://gateway1.emapasalas.net.pe/TipoEstCaja/dropdown/${idTipoConexion}`);
    }
    
    dropdownTipoEstadoTapaAlcan(idTipoConexion: number): Observable<ListResponse<TipoEstadoTapa[]>> {
        return this.http.get<ListResponse<TipoEstadoTapa[]>>(`https://gateway1.emapasalas.net.pe/TipoEstTapa/dropdown/${idTipoConexion}`);
    }

    dropdownTipoTapaAlcan(idTipoConexion: number): Observable<ListResponse<TipoTapa[]>> {
        return this.http.get<ListResponse<TipoTapa[]>>(`https://gateway1.emapasalas.net.pe/TipoTapa/dropdown/${idTipoConexion}`);
    }
  
    dropdownTipoFacturacion(): Observable<ListResponse<TipoFacturacion[]>> {
        return this.http.get<ListResponse<TipoFacturacion[]>>(`https://gateway1.emapasalas.net.pe/TipoFacturacion/dropdown`);
    }

    dropdownTipoEstMedidor(): Observable<ListResponse<EstadoMedidor[]>> {
        return this.http.get<ListResponse<EstadoMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoEstMedidor/dropdown`);
    }

    dropdownTipoEstLectura(): Observable<ListResponse<TipoEstadoLectura[]>> {
        return this.http.get<ListResponse<TipoEstadoLectura[]>>(`https://gateway1.emapasalas.net.pe/TipoEstLectura/dropdown`);
    }

    dropdownTipoMarcaMedidor(): Observable<ListResponse<MarcaMedidor[]>> {
        return this.http.get<ListResponse<MarcaMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoMarcaMedidor/dropdown`);
    }

    dropdownTipoModeloMedidor(): Observable<ListResponse<ModeloMedidor[]>> {
        return this.http.get<ListResponse<ModeloMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoModelMedidor/dropdown`);
    }

    dropdownTipoModeloCertHomologa(): Observable<ListResponse<ModeloHomologacion[]>> {
        return this.http.get<ListResponse<ModeloHomologacion[]>>(`https://gateway1.emapasalas.net.pe/TipoModelCertHomologa/dropdown`);
    }

    dropdownTipoCapacidadMedidor(): Observable<ListResponse<CapacidadMedidor[]>> {
        return this.http.get<ListResponse<CapacidadMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoCapMedidor/dropdown`);
    }

    dropdownTipoPosicionMedidor(): Observable<ListResponse<PosicionMedidor[]>> {
        return this.http.get<ListResponse<PosicionMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoPosicion/dropdown`);
    }

    dropdownTipoMedidor(): Observable<ListResponse<TipoMedidor[]>> {
        return this.http.get<ListResponse<TipoMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoMedidor/dropdown`);
    }

    dropdownTipoLectura(): Observable<ListResponse<TipoLectura[]>> {
        return this.http.get<ListResponse<TipoLectura[]>>(`https://gateway1.emapasalas.net.pe/TipoLectura/dropdown`);
    }

    dropdownTipoResultadoVerifMedidor(): Observable<ListResponse<TipoResultadoVerifMedidor[]>> {
        return this.http.get<ListResponse<TipoResultadoVerifMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoResultadoVerifMedidor/dropdown`);
    }

    dropdownTipoVerificacionMedidor(): Observable<ListResponse<TipoVerificacionMedidor[]>> {
        return this.http.get<ListResponse<TipoVerificacionMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoVerificacionMedidor/dropdown`);
    }

    dropdownTipoClaseMetrologica(): Observable<ListResponse<TipoClaseMetrologica[]>> {
        return this.http.get<ListResponse<TipoClaseMetrologica[]>>(`https://gateway1.emapasalas.net.pe/TipoClaseMetrologica/dropdown`);
    }

    dropdownTipoSituacionMedidor(): Observable<ListResponse<TipoSituacionMedidor[]>> {
        return this.http.get<ListResponse<TipoSituacionMedidor[]>>(`https://gateway1.emapasalas.net.pe/TipoSituacionMedidor/dropdown`);
    }

    dropdownTipoTramiteIngreso(): Observable<ListResponse<TipoTramiteIngreso[]>> {
        return this.http.get<ListResponse<TipoTramiteIngreso[]>>(`https://gateway1.emapasalas.net.pe/TipoTramiteIngreso/dropdown`);
    }

    dropdownTipoIngresoConexion(): Observable<ListResponse<TipoIngresoConexion[]>> {
        return this.http.get<ListResponse<TipoIngresoConexion[]>>(`https://gateway1.emapasalas.net.pe/TipoIngresoConexion/dropdown`);
    }

    dropdownTipopiscina(): Observable<ListResponse<TipoPiscina[]>> {
        return this.http.get<ListResponse<TipoPiscina[]>>(`https://gateway1.emapasalas.net.pe/TipoPiscina/dropdown`);
    }

    dropdownCallexLoc(idlocalidad: number): Observable<ListResponse<Calles[]>> {
        return this.http.get<ListResponse<Calles[]>>(`https://gateway1.emapasalas.net.pe/Calles/dropdown/${idlocalidad}`);
    }

    dropdownUrbaxLoc(idlocalidad: number): Observable<ListResponse<Urbanizacion[]>> {
        return this.http.get<ListResponse<Urbanizacion[]>>(`https://gateway1.emapasalas.net.pe/Urbanizacion/dropdown/${idlocalidad}`);
    }

    dropdownZonaAbastec(idlocalidad: number): Observable<ListResponse<ZonaAbastecimiento[]>> {
        return this.http.get<ListResponse<ZonaAbastecimiento[]>>(`https://gateway1.emapasalas.net.pe/ZonaAbastecimiento/dropdown/${idlocalidad}`);
    }

    dropdownTipoPresionAgua(): Observable<ListResponse<TipoPresion[]>> {
        return this.http.get<ListResponse<TipoPresion[]>>(`https://gateway1.emapasalas.net.pe/TipoPresionAgua/dropdown`);
    }

    dropdownTipoSolicitudConexion(idPresupuesto: number): Observable<ListResponse<TipoSolicitud[]>> {
        return this.http.get<ListResponse<TipoSolicitud[]>>(`https://gateway1.emapasalas.net.pe/TipoSolicitudConexion/dropdown/${idPresupuesto}`);
    }

    dropdownTipoUsoConexion(): Observable<ListResponse<TipoConexion[]>> {
        return this.http.get<ListResponse<TipoConexion[]>>(`https://gateway1.emapasalas.net.pe/TipoUsoConexion/dropdown`);
    }

    dropdownTipoDocumentoPropiedad(): Observable<ListResponse<TipoPresion[]>> {
        return this.http.get<ListResponse<TipoPresion[]>>(`https://gateway1.emapasalas.net.pe/TipoDocumentoPropiedad/dropdown`);
    }

    dropdownTipoEstadoPredio(): Observable<ListResponse<TipoEstadoPredio[]>> {
        return this.http.get<ListResponse<TipoEstadoPredio[]>>(`https://gateway1.emapasalas.net.pe/TipoEstadoPredio/dropdown`);
    }

    dropdownOficinaxSede(idSede: number,): Observable<ListResponse<Oficina[]>> {
        return this.http.get<ListResponse<Oficina[]>>(`https://gateway1.emapasalas.net.pe/Oficina/dropdown/${idSede}`);
    }

    //SOLICITUD COMERCIALIAZCON

    BusquedaSolicitudConex(model: Solicitud): Observable<ListResponse<Solicitud[]>> {
        return this.http.post<ListResponse<Solicitud[]>>(`https://gateway8055.emapasalas.net.pe/Comercializacion/SolicitudConexion/ListSolicitud`,model);
    }

    ConsultaSolicitud(model: Solicitud): Observable<ListResponse<Solicitud>> {
        return this.http.post<ListResponse<Solicitud>>(`https://gateway8055.emapasalas.net.pe/Comercializacion/SolicitudConexion/ConsultaSolicitud`,model);
    }

    BusquedaListaColateral(model:Partial<GestionPadronCorte>): Observable<ListResponse<GestionPadronCorte[]>> {
        return this.http.post<ListResponse<GestionPadronCorte[]>>(`https://gateway8055.emapasalas.net.pe/Comercializacion/SolicitudColateral/ListColaterales`,model);
    }

    ConsultaColateral(model: GestionPadronCorte): Observable<ListResponse<GestionPadronCorte>> {
        return this.http.post<ListResponse<GestionPadronCorte>>(`https://gateway8055.emapasalas.net.pe/Comercializacion/SolicitudColateral/ConsultaColateral`,model);
    }

    crudSolicitudColateral(model: GestionPadronCorte,op: number): Observable<Mensaje> {
        return this.http.post<Mensaje>(`https://gateway8055.emapasalas.net.pe/Comercializacion/SolicitudColateral/${op}`, model);
    }



    //GESTION DE CLIENTE

    crudGestionClientes(model: Personas,op: number): Observable<Mensaje> {
        return this.http.post<Mensaje>(`https://gateway8055.emapasalas.net.pe/CatastroClientes/GestionPersonas/${op}`, model);
    }

    listarPersonas(campo:string,parametro:string): Observable<ListResponse<Personas[]>> {
        return this.http.get<ListResponse<Personas[]>>(`https://gateway8053.emapasalas.net.pe/CatastroClientes/GestionPersonas/ListPersona/${campo}/${parametro}`);
    }

    BusquedaCliente(model: FiltroCliente): Observable<ListResponse<FiltroCliente[]>> {
        return this.http.post<ListResponse<FiltroCliente[]>>(`https://gateway8053.emapasalas.net.pe/CatastroClientes/BusquedaCliente`,model);
    }

    BusquedaCorrespondencia(model: SearchCorrespondencia): Observable<ListResponse<SearchCorrespondencia[]>> {
        return this.http.post<ListResponse<SearchCorrespondencia[]>>(`https://gateway8053.emapasalas.net.pe/CatastroClientes/BusquedaCliente`,model);
    }




    crudSolicitud(model: Solicitud,op: number): Observable<Mensaje> {
        return this.http.post<Mensaje>(`https://gateway8055.emapasalas.net.pe/Comercializacion/SolicitudConexion/${op}`, model);
    }

    BusquedaConexion(model: GestionCatastro): Observable<ListResponse<GestionCatastro>> {
        return this.http.post<ListResponse<GestionCatastro>>(`https://gateway8053.emapasalas.net.pe/CatastroClientes/CatastroConexion/SearchClienteConexion`,model);
    }


    //AGREGADOS RECIENTEMENTE

    dropdownCiclo(idSede: number): Observable<ListResponse<Ciclo[]>> {
        return this.http.get<ListResponse<Ciclo[]>>(`https://gateway1.emapasalas.net.pe/Ciclo/dropdown/${idSede}`);
    }

    dropdownLocalidadxCiclo(idSede: number,idCiclo: number): Observable<ListResponse<Localidad[]>> {
        return this.http.get<ListResponse<Localidad[]>>(`https://gateway1.emapasalas.net.pe/Localidad/dropdown/${idSede}/${idCiclo}`);
    }

    dropdownSectorxCiclo(idCiclo: number,idLocalidad: number): Observable<ListResponse<Sector[]>> {
        return this.http.get<ListResponse<Sector[]>>(`https://gateway1.emapasalas.net.pe/Sector/dropdownCicloSuc/${idCiclo}/${idLocalidad}`);
    }

    dropdownTipoEstServicio(): Observable<ListResponse<TipoEstServicio[]>> {
        return this.http.get<ListResponse<TipoEstServicio[]>>(`https://gateway1.emapasalas.net.pe/TipoEstServicio/dropdown`);
    }

    dropdownTipOrdenamiento(): Observable<ListResponse<TipOrdenamiento[]>> {
        return this.http.get<ListResponse<TipOrdenamiento[]>>(`https://gateway1.emapasalas.net.pe/TipOrdenamiento/dropdown`);
    }

    dropdownServices(idSede: number): Observable<ListResponse<Servis[]>> {
        return this.http.get<ListResponse<Servis[]>>(`https://gateway1.emapasalas.net.pe/Service/dropdown/${idSede}`);
    }

    dropdownTipoMotivoOperacion(idMotivo: number): Observable<ListResponse<TipoMotivOpe[]>> {
        return this.http.get<ListResponse<TipoMotivOpe[]>>(`https://gateway1.emapasalas.net.pe/TipoMotivoOperacion/dropdown/${idMotivo}`);
    }

    dropdownInspector(idSede: number,idService: number,tipoInsp: string): Observable<ListResponse<Inspector[]>> {
        return this.http.get<ListResponse<Inspector[]>>(`https://gateway1.emapasalas.net.pe/Inspector/dropdown/${idSede}/${idService}/${tipoInsp}`);
    }

    dropdownTipoCorte(idSede: number,idService: number): Observable<ListResponse<TipoCorte[]>> {
        return this.http.get<ListResponse<TipoCorte[]>>(`https://gateway1.emapasalas.net.pe/TipoCorte/dropdown/${idSede}/${idService}`);
    }

    consultaListaCorte(model: GestionPadronCorte): Observable<ListResponse<GestionPadronCorte[]>> {
        return this.http.post<ListResponse<GestionPadronCorte[]>>(`https://gateway8054.emapasalas.net.pe/Cobranza/cortes/consulta`, model);
    }

    registraPadronCorte(model: GestionPadronCorte): Observable<Mensaje> {
        return this.http.post<Mensaje>(`https://gateway8054.emapasalas.net.pe/Cobranza/registrarPadronCore`, model);
    }

    //CORTE DE SERVICIO

    consultaCorteServicio(model: GestionCorte): Observable<ListResponse<GestionCorte[]>> {
        return this.http.post<ListResponse<GestionCorte[]>>(`https://gateway8054.emapasalas.net.pe/Cobranza/ListCore`, model);
    }

    registraCore(model: GestionCorte): Observable<Mensaje> {
        return this.http.post<Mensaje>(`https://gateway8054.emapasalas.net.pe/Cobranza/registrarCore`, model);
    }

    ConsultaParamae(model:Partial <Paramae>): Observable<ListResponse<Paramae>> {
        return this.http.post<ListResponse<Paramae>>(`https://gateway1.emapasalas.net.pe/Paramae/ConsultaTipo`,model);
    }

    //REAPERTURA

    registraReapertura(model: GestionCorte): Observable<Mensaje> {
        return this.http.post<Mensaje>(`https://gateway8054.emapasalas.net.pe/Cobranza/registraReapertura`, model);
    }

   /* listarPersonas(campo:string,parametro:string): Observable<ListResponse<Personas[]>> {
        return this.http.get<ListResponse<Personas[]>>(`https://gateway8053.emapasalas.net.pe/CatastroClientes/GestionPersonas/ListPersona/${campo}/${parametro}`);
    }
    */


    

}
