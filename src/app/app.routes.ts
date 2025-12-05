import { Routes } from '@angular/router';
import { EquipoComponent } from './components/equipo-component/equipo-component';
import { InicioComponents } from './components/inicio-components/inicio-components';
import { AdministracionComponent } from './components/administracion-component/administracion-component';
import { InventarioComponent } from './components/inventario-component/inventario-component';
import { RecursosComponent } from './components/recursos-component/recursos-component';
import { CargamasivaComponent } from './components/cargamasiva-component/cargamasiva-component';
import { DbComponent } from './components/db-component/db-component';
import { AsignadosComponent } from './components/asignados-component/asignados-component';
import { FormularioEquipo } from './components/equipo-component/formulario-equipo/formulario-equipo';

export const routes: Routes = [
   { path: 'inicio', component: InicioComponents},
   { path: 'listarEquipo', component: EquipoComponent},
   { path: 'equipos/page/:page', component: EquipoComponent },
   { path: 'listarEquipo/form', component: FormularioEquipo},
   { path: 'listarEquipo/form/:id', component: FormularioEquipo},
   { path: 'listarUsuarios', component: AdministracionComponent },
   { path: 'listarInventario', component: InventarioComponent },
   { path: 'recursos', component: RecursosComponent },
   { path: 'listarAsignados', component: AsignadosComponent },
   { path: 'cargaMasiva', component: CargamasivaComponent },
   { path: 'bd', component: DbComponent },
   { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];
