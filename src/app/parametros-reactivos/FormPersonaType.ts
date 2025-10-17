import { FormControl, FormGroup } from "@angular/forms";

export type FormPersonaType = FormGroup<{
  idPersona: FormControl<string>
  idTipoDocIdentidad: FormControl<string>;
  dni: FormControl<string>;
  ruc: FormControl<string>;
  razonSocial: FormControl<string>;
  nombres: FormControl<string>;
  apellidos: FormControl<string>;
  domicilioLegal: FormControl<string>;
  //estructura
  /*nroDocIdentidad: FormControl<string>;
  fechaRegistro: FormControl<string>;
	usuarioCreacion: FormControl<string>;
	estado: FormControl<boolean>;*/
}>;