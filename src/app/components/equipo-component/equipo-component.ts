import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Paginador } from "../paginador/paginador";
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-equipo-component',
  standalone: true,
  imports: [CommonModule, RouterModule, Paginador],
  templateUrl: './equipo-component.html',
  styleUrl: './equipo-component.css',
})
export class EquipoComponent implements OnInit{

  equipos: Equipo[] = [];
  titulo: string = "Gestion de Equipos";
  paginador: any;
  equipoSeleccionado?: Equipo;

  constructor(
    private _equipoService: EquipoService,
    private _activatedRoute: ActivatedRoute,
    public _modalService: ModalService
  ){}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if(!page){
        page = 0;
      }

      this._equipoService.getEquipos(page).pipe(
        tap(response => {
          console.log('EquipoConponent: tap2'),
          (response.content as Equipo[]).forEach(equipo => {
            console.log(equipo.descripcion);
          });
        })
      )
      .subscribe(response => {
        this.equipos = response.content as Equipo[]
        this.paginador = response;
      })
    });

    this._modalService.notificarUpload.subscribe( equipo => {
      this.equipos = this.equipos.map( equipoOriginal => {
        return equipoOriginal;
      })
    });
  }

  delete(equipo: Equipo): void{
    Swal.fire({
      title: 'Estas seguro!?',
      text: `¿Seguro que deseas eliminar al cliente ${equipo.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if(result.value){
        this._equipoService.delete(equipo.id!).subscribe(response => {
          this.equipos = this.equipos.filter(cli => cli !== equipo),
          Swal.fire(
            'Equipo Eliminado!',
            `Equipo ${equipo.descripcion} eliminado con exito.!`,
            'success'
          )
        })
      }
    });
  }

  descargarReporte(formato : string): void{
    this._equipoService.exportarReportes(formato).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        const extension = formato === 'excel' ? 'xlsx' : 'pdf';
        a.download = `Reporte_Equipos.${new Date().toISOString().slice(0,10)}.${extension}`;

        a.href = url;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Fallo la descarga: ', err);        
      }
    });
  }

  abrirModal(equipo: Equipo): void{
    this.equipoSeleccionado = equipo;
    this._modalService.abrirModal();
  }

}
