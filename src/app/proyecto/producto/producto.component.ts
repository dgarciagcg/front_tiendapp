import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/interfaces/marca.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';

/* Alertify y Bootstrap */
declare let alertify: any;
declare let bootstrap: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  formularioCrear!: FormGroup;
  formularioEditar!: FormGroup;

  productos: Producto[] = [];
  marcas: Marca[] = [];
  producto!: Producto;
  id_producto!: number;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private marcaService: MarcaService
  ) { }

  ngOnInit(): void {
    this.initFormCrear();
    this.initFormEditar();
    this.getProductos();
    this.getMarcas();
  }

  /** Inicializa el formulario del producto con la validaciones por defecto */
  initFormCrear = () => {
    this.formularioCrear = this.fb.group({
      nombre: ['', [Validators.required]],
      talla: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      id_marca: ['', [Validators.required]],
      cantidadInventario: ['', [Validators.required]],
      fechaEmbarque: ['', [Validators.required]],
    });
  }

  /** Inicializa el formulario del producto con la validaciones por defecto */
  initFormEditar = () => {
    this.formularioEditar = this.fb.group({
      id_producto: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      talla: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      id_marca: ['', [Validators.required]],
      cantidadInventario: ['', [Validators.required]],
      fechaEmbarque: ['', [Validators.required]],
    });
  }

  saveProducto = () => {
    if (!this.formularioCrear.valid) {
      const controles = Object.keys(this.formularioCrear.controls);
      for (let index = 0; index < controles.length; index++) {
        if (this.formularioCrear.get(controles[index])?.invalid) {
          return alertify.error(`El campo: ${controles[index]} no es válido`);
        }
      }
      return alertify.error('Faltan campos por diligenciar');
    }

    this.productoService.saveProducto(this.formularioCrear.value).subscribe((response: any) => {
      this.getProductos();
      this.initFormCrear();
      alertify.success('Guardado!');
    });
  }

  updateProducto = () => {
    this.productoService.updateProducto(this.formularioEditar.value).subscribe((response: any) => {
      this.getProductos();
      this.initFormCrear();
      this.initFormEditar();
      const modalConfirmacion = document.querySelector('#editar') as HTMLElement;
      const modalToOpenInstance = bootstrap.Modal.getOrCreateInstance(modalConfirmacion);
      modalToOpenInstance?.hide();
      alertify.success('Guardado!');
    });
  }

  getProductos = () => {
    this.productoService.getProductos().subscribe((response: any) => {
      this.productos = response;
    })
  }

  getMarcas = () => {
    this.marcaService.getMarcas().subscribe((response: any) => {
      this.marcas = response;
    })
  }

  getProducto = (id_producto: any) => {
    this.productoService.getProducto(id_producto).subscribe((response: any) => {
      this.producto = response[0];
      this.setValueEstudiante(this.producto);
    })
  }

  deleteProducto = (id_producto: any) => {
    this.productoService.deleteProducto(id_producto).subscribe((response: any) => {
      this.getProductos();
      alertify.success('Eliminado!');
    })
  }

  setValueEstudiante = (producto: any) => Object.keys(producto).forEach(elm =>
    this.formularioEditar.get(elm)?.setValue(producto[elm])
  );

}
