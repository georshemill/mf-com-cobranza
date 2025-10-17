import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { GestionOrdenTrabajo } from '../../../models/orden-trabajo/GestionOrdenTrabajo';
import { ParametrosModule } from '../../parametros.module';

@Component({
  selector: 'app-orden-trabajo',
  imports: [ParametrosModule],
  templateUrl: './orden-trabajo.component.html',
  styleUrl: './orden-trabajo.component.scss'
})
export class OrdenTrabajoComponent implements OnInit {
  dialogForm:boolean=false
   _gestionOrdenTrabajo:GestionOrdenTrabajo[] = []




  ngOnInit(): void {

  }

  nuevo(){
    this.dialogForm=true
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ModalClose(){
    // this.formTipo.reset()
   }

}
