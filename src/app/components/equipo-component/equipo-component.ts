import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { EquipoService } from '../../services/equipo-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Paginador } from "../paginador/paginador";

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
    private _activatedRoute: ActivatedRoute
    //private _modalService: ModalService    
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
  }

  delete(){
    
  }

  exportarPDF(){

  }

  exportarExcel(){

  }

}
