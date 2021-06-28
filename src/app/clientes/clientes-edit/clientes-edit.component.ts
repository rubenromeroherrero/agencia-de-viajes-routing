import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatFecha } from 'src/app/utils/date-helpers';
import { Cliente } from '../models/cliente';
import { ClientesModelService } from '../services/clientes-model.service';
import { IdValorClient } from '../services/id-valor-client';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss']
})
export class ClientesEditComponent implements OnInit {

  submitted = false;
  cliente: Cliente | null = null;

  //globalizamos el id recogido
  id: string = '';
  clientesForm: FormGroup;

  estadosCiviles: IdValorClient[] = [];

  constructor(fb: FormBuilder, private clientesModel: ClientesModelService,  private router: Router, route: ActivatedRoute) {
    // extraemos del header el id del usuario, para saber si editamos o creamos
    route.params.subscribe(params => {
      this.id = params.id || '';
    })

    this.clientesForm = fb.group({
      // se requiere para poder rellenar también el id al traer los datos del servidor
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.email],
      dni: [''],
      telefono: [''],
      estadoCivilId: [''],
      direccion: [''],
      fechaNacimiento: [null],
    })
  }

  ngOnInit(): void {
    if (this.id) {
      this.clientesModel.getById(this.id).subscribe(cliente => {
        if (cliente) {
          // Establecemos los valores en el formulario
          this.clientesForm.patchValue(cliente);
          if (cliente?.fechaNacimiento) {
            // importamos la funcionalidad de fecha, que la tenemos en un archivo utilidades, como servicio
            const t = formatFecha(cliente?.fechaNacimiento);
            this.clientesForm.controls.fechaNacimiento.setValue(t);
          }
        }
      })
    }

    this.clientesModel.getEstadosCiviles().subscribe(estados => {
      this.estadosCiviles = estados;
    })
    // this.estadosCiviles = this.clientesModel.getEstadosCiviles();
  }

  guardarClick(form: FormGroup): void {
    this.submitted = true;

    if (form.valid) {
      // guardar la información del formuilario en una constante de tipo cliente, para llevarla al servicio y meterla en la DB
      const cliente: Cliente = form.value;

      if (cliente.fechaNacimiento) {
        cliente.fechaNacimiento = new Date(cliente.fechaNacimiento);
      }

      this.clientesModel.save(cliente).subscribe(cliente => {
        this.router.navigate(['clientes']);
      })
    }
  }

  resetForm(): void {
    this.submitted = false;
    // Limpiamos el formulario con el método reset
    this.clientesForm.reset();
  }


 

}
