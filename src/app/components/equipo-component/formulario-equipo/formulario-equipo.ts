import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../../models/equipo';
import { Moneda } from '../../../models/moneda';
import { Categoria } from '../../../models/categoria';
import { Estado } from '../../../models/estado';
import { EquipoService } from '../../../services/equipo-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-equipo',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './formulario-equipo.html',
  styleUrl: './formulario-equipo.css',
})
export class FormularioEquipo implements OnInit{

  public equipo : Equipo = new Equipo();
  public monedas: Moneda[] = [];
  public categorias: Categoria[] = [];
  public estados: Estado[] = [];
  public titulo: string = "Crear Equipo";

  public errores: string[] = [];

  constructor(
    private _equipoService: EquipoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.cargarEquipo();
  }

  cargarEquipo(): void {
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this._equipoService.getEquipo(id).subscribe((equipo) => this.equipo = equipo);
      }
    });
    this._equipoService.getMenedas().subscribe(monedas => this.monedas = monedas);
    this._equipoService.getCategorias().subscribe(categorias => this.categorias = categorias);
    this._equipoService.getEstados().subscribe(estados => this.estados = estados);
  }

  public create(): void{
    this.equipo.descripcion = this.equipo.descripcion?.toUpperCase();
    this._equipoService.create(this.equipo).subscribe(
      equipo => {
        this._router.navigate(['/listarEquipo']),
        Swal.fire('Nuevo Equipo', `El equipo ${equipo.descripcion} ha sido creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update(): void{
    this._equipoService.update(this.equipo).subscribe(json => {
      this._router.navigate(['/listarEquipo']),
      Swal.fire('Equipo Actualizado', `El equipo ${json.equipo.descripcion}`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error("Codigo del error desde el backend: " + err.status);
      console.error(err.error.errors);
    }
  );
  }

  public compararMoneda(m1: Moneda, m2: Moneda): boolean {
    if(m1 == undefined && m2 == undefined){
      return true;
    }
    return m1 == null || m2 == null || m1 == undefined || m2 == undefined ? false : m1.id == m2.id
  }

  public compararEstado(e1: Estado, e2: Estado): boolean {
    if(e1 == undefined && e2 == undefined){
      return true;
    }
    return e1 == null || e2 == null || e1 == undefined || e2 == undefined ? false : e1.id == e2.id
  }

  public compararCategoria(c1: Categoria, c2: Categoria): boolean{
    if(c1 == undefined && c2 == undefined){
      return true;
    }
    return c1 == null || c2 == null || c1 == undefined || c2 == undefined ? false : c1.id == c2.id
  }

}
