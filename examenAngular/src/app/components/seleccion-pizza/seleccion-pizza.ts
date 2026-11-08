import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seleccion-pizza',
  templateUrl: './seleccion-pizza.html',
  styleUrls: ['./seleccion-pizza.css'],
  standalone: false
})
export class SeleccionPizza {
  @Input() form!: FormGroup;
  @Output() agregar = new EventEmitter<void>();

  onAgregar() {
    this.agregar.emit();
  }

  get numPizzasInvalido(): boolean {
    if (!this.form) return false;
    const ctrl = this.form.get('numPizzas');
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }
}