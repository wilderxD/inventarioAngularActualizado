import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Equipo } from '../models/equipo';
import { Moneda } from '../models/moneda';
import { Categoria } from '../models/categoria';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/equipos'

  constructor(
    private _http: HttpClient,
    private _router: Router
  ){}

  getEquipos(page: number): Observable<any>{
    return this._http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log("Equipos Service: tap 1");
      (response.content as Equipo[]).forEach( equipo => {
        console.log(equipo.descripcion);
      })
      })     
    );    
  }

  create(equipo: Equipo): Observable<Equipo>{
    return this._http.post(this.urlEndPoint, equipo).pipe(
      map((response: any) => response.equipo as Equipo),
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  getEquipo(id: number):Observable<Equipo>{
    return this._http.get<Equipo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this._router.navigate(['/equipos']);
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  update(equipo: Equipo): Observable<any>{
    return this._http.put<any>(`${this.urlEndPoint}/${equipo.id}`, equipo).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Equipo>{
    return this._http.delete<Equipo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        if(e.error.mensaje){  
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  getMenedas(): Observable<Moneda[]>{
    return this._http.get<Moneda[]>(this.urlEndPoint + '/monedas').pipe(
      catchError( e => {
        return throwError(() => e);
      })
    );
  }

  getCategorias(): Observable<Categoria[]>{
    return this._http.get<Categoria[]>(this.urlEndPoint + '/categorias').pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );    
  }

  getEstados(): Observable<Estado[]>{
    return this._http.get<Estado[]>(this.urlEndPoint + '/estados').pipe(
      catchError( e => {
        return throwError(() => e);
      })
    );
  }

  exportarReportes(formato: string): Observable<Blob>{//: Observable<Blob>
    const urlExportar = `${this.urlEndPoint}/exportar?formato=${formato}`;
    return this._http.get(urlExportar, {responseType: 'blob'}).pipe(
      catchError(e => {
        console.error(`Error al exportar en formato ${formato}: `, e);
        return throwError(() => e);
      })
    );
  }
}
