import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'proyecto', loadChildren: () => import('./proyecto/proyecto.module').then(m => m.ProyectoModule) },
  { path: '', redirectTo: 'proyecto', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
