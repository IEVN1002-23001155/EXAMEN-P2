import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PedidoService } from '../../services/pedido';
import { FlashService } from '../../services/flash';

export function validarFecha(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;
  const anio = valor.split('-')[0];
  if (anio && anio.length > 4) {
    return { anioInvalido: true };
  }
  return null;
}

@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.html',
  styleUrls: ['./registro-pedido.css'],
  standalone: false
})
export class RegistroPedido {
  pedidoForm: FormGroup;
  pizzasAgregadas: any[] = [];
  totalPedido: number = 0;

  precios: any = { 'Chica': 40, 'Mediana': 80, 'Grande': 120 };

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private flashService: FlashService
  ) {
    this.pedidoForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha: ['', [Validators.required, validarFecha]],
      tamano: ['Chica', Validators.required],
      numPizzas: [1, [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]+$')
      ]],
      ingredientes: this.fb.group({
        jamon: [false],
        pina: [false],
        champinones: [false]
      })
    });
  }

  get puedeTerminar(): boolean {
    return this.pedidoForm.valid && this.pizzasAgregadas.length > 0;
  }

  agregarPizza() {
    const tamanoCtrl = this.pedidoForm.get('tamano');
    const numPizzasCtrl = this.pedidoForm.get('numPizzas');

    tamanoCtrl?.markAsTouched();
    numPizzasCtrl?.markAsTouched();

    if (tamanoCtrl?.invalid || numPizzasCtrl?.invalid) {
      this.flashService.show('Selecciona un tamaño y una cantidad válida (entero mayor a 0).');
      return;
    }

    const tamano = String(this.pedidoForm.value.tamano).trim();
    const numPizzas = Number(this.pedidoForm.value.numPizzas);
    const ing = this.pedidoForm.value.ingredientes;

    const precioUnitario = this.precios[tamano];
    if (!precioUnitario) {
      this.flashService.show('Error: Tamaño no válido.');
      return;
    }

    const seleccionados: string[] = [];
    if (ing.jamon) seleccionados.push('Jamón');
    if (ing.pina) seleccionados.push('Piña');
    if (ing.champinones) seleccionados.push('Champiñones');

    const ingredientesStr = seleccionados.length > 0
      ? seleccionados.join(', ')
      : 'Sin ingredientes extra';

    const precioBase = Number(precioUnitario) * numPizzas;
    const costoIngredientes = seleccionados.length * 10 * numPizzas;
    const subtotal = precioBase + costoIngredientes;

    this.pizzasAgregadas.push({
      tamano: tamano,
      ingredientes: ingredientesStr,
      num_pizzas: numPizzas,
      subtotal: subtotal
    });

    this.actualizarTotal();

    this.pedidoForm.patchValue({ tamano: 'Chica', numPizzas: 1 });
    this.pedidoForm.get('ingredientes')?.reset({
      jamon: false, pina: false, champinones: false
    });
  }

  quitarPizza(index: number) {
    this.pizzasAgregadas.splice(index, 1);
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.totalPedido = this.pizzasAgregadas.reduce(
      (acc, p) => acc + Number(p.subtotal), 0
    );
  }

  terminarPedido() {
    if (!this.puedeTerminar) {
      this.flashService.show('Completa los datos del cliente y agrega al menos una pizza.');
      return;
    }

    const totalActual = this.totalPedido;

    const pedidoFinal = {
      nombre_cliente: this.pedidoForm.value.nombre,
      direccion: this.pedidoForm.value.direccion,
      telefono: this.pedidoForm.value.telefono,
      fecha_pedido: this.pedidoForm.value.fecha,
      total: totalActual,
      detalles: this.pizzasAgregadas
    };

    this.pedidoService.guardarPedido(pedidoFinal).subscribe({
      next: (res) => {
        const mensaje = res.mensaje || `¡Pedido registrado con éxito! Total a pagar: $${totalActual}`;
        this.flashService.show(mensaje);

        this.pedidoForm.reset({
          tamano: 'Chica',
          numPizzas: 1,
          ingredientes: { jamon: false, pina: false, champinones: false }
        });
        this.pizzasAgregadas = [];
        this.totalPedido = 0;
      },
      error: (err) => {
        console.error(err);
        this.flashService.show(
          'Error en el servidor: ' + (err.error?.error || err.message)
        );
      }
    });
  }
}