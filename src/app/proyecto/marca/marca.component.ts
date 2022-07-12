import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/interfaces/marca.interface';
import { MarcaService } from 'src/app/services/marca.service';

/* Alertify y Bootstrap */
declare let alertify: any;
declare let bootstrap: any;

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  formularioCrear!: FormGroup;
  formularioEditar!: FormGroup;

  marcas: Marca[] = [];
  marca!: Marca;
  id_marca!: number;

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService
  ) { }

  ngOnInit(): void {
    this.initFormCrear();
    this.initFormEditar();
    this.getMarcas();
  }

  /** Inicializa el formulario de la marca con la validaciones por defecto */
  initFormCrear = () => {
    this.formularioCrear = this.fb.group({
      nombre: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
    });
  }

  /** Inicializa el formulario da la marca con la validaciones por defecto */
  initFormEditar = () => {
    this.formularioEditar = this.fb.group({
      id_marca: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
    });
  }

  saveMarca = () => {
    if (!this.formularioCrear.valid) {
      const controles = Object.keys(this.formularioCrear.controls);
      for (let index = 0; index < controles.length; index++) {
        if (this.formularioCrear.get(controles[index])?.invalid) {
          return alertify.error(`El campo: ${controles[index]} no es válido`);
        }
      }
      return alertify.error('Faltan campos por diligenciar');
    }

    this.marcaService.saveMarca(this.formularioCrear.value).subscribe((response: any) => {
      this.getMarcas();
      this.initFormCrear();
    });
  }

  updateMarca = () => {
    this.marcaService.updateMarca(this.formularioEditar.value).subscribe((response: any) => {
      this.getMarcas();
      this.initFormCrear();
      this.initFormEditar();
      const modalConfirmacion = document.querySelector('#editar') as HTMLElement;
      const modalToOpenInstance = bootstrap.Modal.getOrCreateInstance(modalConfirmacion);
      modalToOpenInstance?.hide();
      alertify.success('Guardado!');
    });
  }

  getMarcas = () => {
    this.marcaService.getMarcas().subscribe((response: any) => {
      this.marcas = response;
    })
  }

  getMarca = (id_marca: any) => {
    this.marcaService.getMarca(id_marca).subscribe((response: any) => {
      this.marca = response[0];
      this.setValueMarca(this.marca);
    })
  }

  deleteMarca = (id_marca: any) => {
    this.marcaService.deleteMarca(id_marca).subscribe((response: any) => {
      this.getMarcas();
      alertify.success('Eliminada!');
    })
  }

  setValueMarca = (producto: any) => Object.keys(producto).forEach(elm =>
    this.formularioEditar.get(elm)?.setValue(producto[elm])
  );

}
