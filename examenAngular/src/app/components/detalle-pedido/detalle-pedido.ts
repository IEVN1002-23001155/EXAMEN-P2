import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.html',
  styleUrls: ['./detalle-pedido.css'],
  standalone: false
})
export class DetallePedido {
  @Input() pizzas: any[] = [];
  @Input() total: number = 0;
  @Input() puedeTerminar: boolean = false;

  @Output() quitarPizza = new EventEmitter<number>();
  @Output() terminar = new EventEmitter<void>();

  onQuitar(index: number) { this.quitarPizza.emit(index); }
  onTerminar() { if (this.puedeTerminar) this.terminar.emit(); }
}