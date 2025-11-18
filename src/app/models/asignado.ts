import { Equipo } from "./equipo";
import { Oficina } from "./Oficina";

export class Asignado{
   id?: number;
   codigo?: string;
   descipcion?: string;
   equipos: Array<Equipo> = [];
   oficina?: Oficina;
   createAt?: string;
}
