import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.html',
  styleUrls: ['./datos-cliente.css'],
  standalone: false
})
export class DatosCliente {
  @Input() form!: FormGroup;

  isInvalid(campo: string): boolean {
    if (!this.form) return false;
    const ctrl = this.form.get(campo);
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }
}