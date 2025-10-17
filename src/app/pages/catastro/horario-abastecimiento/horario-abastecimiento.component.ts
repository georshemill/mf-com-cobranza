import { Component } from '@angular/core';
import { ParametrosModule } from '../../parametros.module';

@Component({
  selector: 'app-horario-abastecimiento',
  imports: [ParametrosModule],
  templateUrl: './horario-abastecimiento.component.html',
  styleUrl: './horario-abastecimiento.component.scss'
})
export class HorarioAbastecimientoComponent {
  dialogForm:boolean=false





  nuevo(){
    //this.new=1
    this.dialogForm=true
  }

  ModalClose(){
    // this.formTipo.reset()
   }


}


