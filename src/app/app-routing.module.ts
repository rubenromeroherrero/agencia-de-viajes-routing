import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';


// ng g m viajes --routing --route viajes --module app --> instalar modulos

const routes: Routes = [
  // el redirecto to, indicamos que cuando escribamos '', nos llevará siempre a home
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    // controlamos que pueda o no pueda ir a esta ruta
    canActivate: [AuthGuard]
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then(m => m.ViajesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Con esto cargamos los path de viajes y clientes también en la página home de inciio
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
