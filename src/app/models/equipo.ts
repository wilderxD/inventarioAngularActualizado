import { Asignado } from "./asignado";
import { Categoria } from "./categoria";
import { Estado } from "./estado";
import { Moneda } from "./moneda";

export class Equipo {
   id?: number;
   descripcion?: string;
   valor?: number;
   moneda?: Moneda;
   detalle?: string;
   categoria?: Categoria;
   estado?: Estado;
   asignado?: Asignado;

}
