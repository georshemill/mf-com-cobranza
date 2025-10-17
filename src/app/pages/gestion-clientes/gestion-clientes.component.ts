import { Component, OnInit,  } from '@angular/core';
import { ParametrosModule } from '../parametros.module';
import { Personas } from '../../models/Personas';
import { AbstractControl, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FuncionesService } from '../../services/funciones.service';
import { TipoDocumento } from '../../models/TipoDocumento';
import { CatastroService } from '../../services/Cobranza.service';
import { FormPersonaType } from '../../parametros-reactivos/FormPersonaType';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-gestion-clientes',
  imports: [ParametrosModule],
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.scss',
  providers: [CatastroService]
})
export class GestionClientesComponent implements OnInit {
  blockTable:number=0
  dialogForm:boolean=false
  _personas:Personas[] = []
  validaForm=false
  _tipoDocumento:TipoDocumento[] = []
  new:number=0
  formPersona: FormPersonaType
  nrodocumento: string=""
  datos: string=""
  campo: string=""
  parametro: string=""

 
  
  constructor(private catastroService:CatastroService,
              private funcionesService: FuncionesService,
              private formBuilder: NonNullableFormBuilder,
              private messageService: MessageService) {

              this.formPersona = this.formBuilder.group({
                idPersona:[{ value: '', disabled: true }],
                dni:['',[]],
                ruc:['',[]],
                razonSocial:['',[]],
                idTipoDocIdentidad: ['', [Validators.required]],
                nombres: ['', []],
                apellidos: ['', []],
                domicilioLegal: ['', []],
                //fechaNac: ['', [Validators.required]]
              })
  }


  ngOnInit(): void {
    this.init()
    this.onSelectDoc('01')
  }

  init(){
    this.catastroService.dropdownTipodocumento().subscribe((respuesta) => {
      this._tipoDocumento=respuesta.data
    })
  }

  
  getErrorMessage(controlName: keyof FormPersonaType['controls']): string {
    const control = this.formPersona.controls[controlName];
    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control.hasError('minlength')) {
      return `Debe tener al menos ${control.getError('minlength')?.requiredLength} caracteres`;
    }
    if (control.hasError('pattern')) {
      return 'Formato inválido';
    }
    return '';
  }


  nuevo(){
    this.formPersona.controls.idTipoDocIdentidad.enable();
    this.new=1
    this.dialogForm=true
  }

  editar(event: Event,personas: Personas){
    this.formPersona.controls.idTipoDocIdentidad.disable();
    this.new=0
    this.dialogForm=true
    if(personas.idTipoDocIdentidad==='01'){
      this.formPersona.get('dni')?.setValue(personas.nroDocIdentidad);
    }else{
      this.formPersona.get('ruc')?.setValue(personas.nroDocIdentidad);
    }
    this.formPersona.patchValue(personas)
  }

  onSelectDoc(x: string) {
    if (x === '01' || x!=='06') {
      this.formPersona.get('idTipoDocIdentidad')?.setValue('01');
      this.formPersona.patchValue({ruc: '',razonSocial: ''});
      this.formPersona.controls.dni.setValidators([Validators.required,Validators.minLength(8),Validators.maxLength(8),]);
      this.formPersona.controls.dni.updateValueAndValidity();
      this.formPersona.controls.nombres.setValidators([Validators.required]);
      this.formPersona.controls.nombres.updateValueAndValidity();
      this.formPersona.controls.apellidos.setValidators([Validators.required]);
      this.formPersona.controls.apellidos.updateValueAndValidity();
      this.formPersona.controls.ruc.clearValidators();
      this.formPersona.controls.ruc.updateValueAndValidity();
      this.formPersona.controls.razonSocial.clearValidators();
      this.formPersona.controls.razonSocial.updateValueAndValidity();
    } else {
      this.formPersona.get('idTipoDocIdentidad')?.setValue('06');
      this.formPersona.patchValue({dni: '',nombres: '',apellidos: ''});
      this.formPersona.controls.ruc.setValidators([Validators.required,Validators.minLength(11),Validators.maxLength(11),]);
      this.formPersona.controls.ruc.updateValueAndValidity();
      this.formPersona.controls.razonSocial.setValidators([Validators.required,Validators.minLength(10),]);
      this.formPersona.controls.razonSocial.updateValueAndValidity();
      this.formPersona.controls.dni.clearValidators();
      this.formPersona.controls.dni.updateValueAndValidity();
      this.formPersona.controls.nombres.clearValidators();
      this.formPersona.controls.nombres.updateValueAndValidity();
      this.formPersona.controls.apellidos.clearValidators();
      this.formPersona.controls.apellidos.updateValueAndValidity();
    }
  }

  listar() {
    this.catastroService.listarPersonas(this.campo, this.parametro).subscribe({
      next: (data) => {
        if (data.data.length != 0) {
          this._personas = data.data;
          this.nrodocumento = "";
          this.datos = "";
          this.blockTable = 1;
        } else {
          this.funcionesService.popupError("Búsqueda sin información", "");
          this._personas = [];
          this.blockTable = 0;
          this.nrodocumento = "";
          this.datos = "";
        }
      },
      error: (err) => {
        this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
        this._personas = [];
        this.blockTable = 0;
        this.nrodocumento = "";
        this.datos = "";
      }
    });
  }

  Busqueda(){
      if(this.nrodocumento==undefined ||this.nrodocumento==""){
        this.campo="NombreCompleto"
        this.parametro=this.datos
      }else{
        this.campo="nroDocIdentidad"
        this.parametro=this.nrodocumento
      }

        this.catastroService.listarPersonas(this.campo, this.parametro).subscribe({
          next: (data) => {
            if (data.data.length != 0) {
              this._personas = data.data;
              //this.nrodocumento = "";
              //this.datos = "";
              this.blockTable = 1;
            } else {
              this.funcionesService.popupError("Búsqueda sin información", "");
              this._personas = [];
              this.blockTable = 0;
              this.nrodocumento = "";
              this.datos = "";
            }
          },
          error: (err) => {
            this.funcionesService.popupError("Búsqueda sin información", "Intente nuevamente");
            this._personas = [];
            this.blockTable = 0;
            this.nrodocumento = "";
            this.datos = "";
          }
        });       
  }

  gestionar(){

    if(this.formPersona.valid==false){
      this.validaForm=true
      this.messageService.add({severity: 'warn',summary: 'Atención!',detail: 'Complete los datos correctamente',life: 3000});
    }
    if (this.formPersona.valid) {
      const _personasModel = this.formPersona.getRawValue() as Personas;
      _personasModel.usuarioCreacion="CHIBELASO"
      const id = _personasModel.idPersona

      if(_personasModel.idTipoDocIdentidad==='01'){
        _personasModel.nroDocIdentidad=_personasModel.dni
      }else{
        _personasModel.nroDocIdentidad=_personasModel.ruc
      }
      
      if (id === null || id === undefined || id === '')
        this.catastroService.crudGestionClientes(_personasModel, 1).subscribe((respuesta) => {
          this.dialogForm=false
            if(respuesta.success==true){
              this.funcionesService.popupExito("Confirmacion","El Registro se Genero Correctamente");
              this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Agregado',life: 3000});
              //this.listar()
            }else {
              this.funcionesService.popupError("Aviso de Usuario",respuesta.message);
            }
        })
      else 
        this.catastroService.crudGestionClientes(_personasModel, 2).subscribe((respuesta) => {
          this.dialogForm=false
            if(respuesta.success==true){
              this.funcionesService.popupExito("Confirmacion","El Registro se Modifico Correctamente");
              this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Actualizado',life: 3000});
              this.Busqueda()
            }else {
              this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
            }
        })
    }
  }

  /*desactivar(event: Event, tipoAbastecimiento: TipoAbastecimiento) {
    tipoAbastecimiento.tipo="TipoAbastecimiento"
    tipoAbastecimiento.usuarioCreacion="CHIBELASO"
    event.stopPropagation();
    this.funcionesService.popupConfirmacion("Eliminar","Desea Eliminar el Registro?","Eliminar").then((result)=>{
        if(result.isConfirmed){
            this.tipoabastecimientoService.crud(tipoAbastecimiento, 3).subscribe((respuesta) => {
                if(respuesta.success==true){
                    this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Eliminado',life: 3000});
                    this.listar()
                }else {
                  this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
                }
            })
        }
    })
  }

  activar(event: Event, tipoAbastecimiento: TipoAbastecimiento) {
    tipoAbastecimiento.tipo="TipoAbastecimiento"
    tipoAbastecimiento.usuarioCreacion="CHIBELASO"
    event.stopPropagation();
    this.funcionesService.popupConfirmacion("Activar","Desea Activar el Registro?","Activar").then((result)=>{
        if(result.isConfirmed){
            this.tipoabastecimientoService.crud(tipoAbastecimiento, 4).subscribe((respuesta) => {
                if(respuesta.success==true){
                    this.messageService.add({severity: 'success',summary: 'Confirmacion',detail: 'Registro Activado',life: 3000});
                    this.listar()
                }else {
                  this.funcionesService.popupError("Aviso de Usuario","Ocurrio un Error al Actualizar los Datos");
                }
            })
        }
    })
  }*/

  toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
      if (event.type === 'mouseenter') {
          opt.style.display = 'flex';
          date.style.display = 'none';
      } else {
          opt.style.display = 'none';
          date.style.display = 'flex';
      }
  }
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  toUpperCase(campo: string) {
    const control = this.formPersona.get(campo);
    if (control) {
      control.setValue(control.value?.toUpperCase(), { emitEvent: false });
    }
  }

  ModalClose(){
    this.formPersona.reset()
    this.onSelectDoc('01')
  }
}
