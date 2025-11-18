import { Routes } from '@angular/router';
import { EquipoComponent } from './components/equipo-component/equipo-component';
import { InicioComponents } from './components/inicio-components/inicio-components';
import { AdministracionComponent } from './components/administracion-component/administracion-component';
import { InventarioComponent } from './components/inventario-component/inventario-component';
import { RecursosComponent } from './components/recursos-component/recursos-component';
import { CargamasivaComponent } from './components/cargamasiva-component/cargamasiva-component';
import { DbComponent } from './components/db-component/db-component';
import { AsignadosComponent } from './components/asignados-component/asignados-component';

export const routes: Routes = [
   { path: 'inicio', component: InicioComponents},
   { path: 'listarEquipo', component: EquipoComponent},
   { path: 'listarUsuarios', component: AdministracionComponent },
   { path: 'listarInventario', component: InventarioComponent },
   { path: 'recursos', component: RecursosComponent },
   { path: 'listarAsignados', component: AsignadosComponent },
   { path: 'cargaMasiva', component: CargamasivaComponent },
   { path: 'bd', component: DbComponent },
   { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];
