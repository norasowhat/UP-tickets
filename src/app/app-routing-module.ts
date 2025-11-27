import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./com/login/login').then((m) => m.Login),
  },
  {
    path: 'pagina-principal',
    loadComponent: () =>
      import('./com/pagina-principal/pagina-principal').then((m) => m.PaginaPrincipal),
  },
  {
    path: 'pagina-resumen',
    loadComponent: () => import('./com/pagina-resumen/pagina-resumen').then((m) => m.PaginaResumen),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
