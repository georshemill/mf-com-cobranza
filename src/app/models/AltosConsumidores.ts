
export class AltosConsumidores{

	idEmpresa: number =1;
	idSede: number | null = null;
	idSucursal: number | null = null;


	usuarioCreacion: string | null = null;
	cajero: string | null = null;
	car!:number
	
    //PARAMETROS DE SALIDA 
    nroSuministro: number | null = null;   
    propietario: string | null = null; 
    direccion: string | null = null;    
    localidad: string | null = null;
    tipoServicio: string | null = null;
    nroMedidor: string | null = null;
    nroMesesDeuda: number | null = null;     
    estadoServicio: string | null = null;  
    deudaTotal: string | null = null;             
    deudaEnReclamo: string | null = null;    

	
}