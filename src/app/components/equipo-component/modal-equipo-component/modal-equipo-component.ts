import { Component, Input } from '@angular/core';
import { Equipo } from '../../../models/equipo';
import { ModalService } from '../../../services/modal-service';
import { EquipoService } from '../../../services/equipo-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-equipo-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-equipo-component.html',
  styleUrl: './modal-equipo-component.css',
})
export class ModalEquipoComponent {

  @Input() public equipo?: Equipo;
  public titulo: string = 'Detalle del Equipo'
  
  constructor(
    public _modalService: ModalService,
    private _equipoService: EquipoService
  ){}

  cerrarModal(): void{
    this._modalService.cerrarModal();    
  }

}
