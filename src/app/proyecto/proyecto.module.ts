import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaComponent } from './marca/marca.component';
import { ProductoComponent } from './producto/producto.component';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoComponent } from './proyecto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{
  component: ProyectoComponent,
  path: '',
  children: [
    { path: 'producto', component: ProductoComponent },
    { path: 'marca', component: MarcaComponent },
    { path: '', redirectTo: 'producto', pathMatch: 'full' },
    { path: '**', redirectTo: 'producto' }
  ]
}];

@NgModule({
  declarations: [
    ProyectoComponent,
    MarcaComponent,
    ProductoComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class ProyectoModule { }
