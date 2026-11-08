import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PedidoService, Pedido, VentasResponse, DetallesResponse
} from '../../services/pedido';

const DIAS: { [key: string]: number } = {
  'Sunday': 1, 'Monday': 2, 'Tuesday': 3, 'Wednesday': 4,
  'Thursday': 5, 'Friday': 6, 'Saturday': 7
};

const MESES: { [key: string]: number } = {
  'January': 1, 'February': 2, 'March': 3, 'April': 4,
  'May': 5, 'June': 6, 'July': 7, 'August': 8,
  'September': 9, 'October': 10, 'November': 11, 'December': 12
};

@Component({
  selector: 'app-consultas-ventas',
  templateUrl: './consultas-ventas.html',
  styleUrls: ['./consultas-ventas.css'],
  standalone: false
})
export class ConsultasVentas {
  tipoConsulta: string = 'dia';
  valorConsulta: string = 'Monday';

  ventas$: Observable<VentasResponse> | null = null;
  detalles$: Observable<DetallesResponse> | null = null;
  pedidoSeleccionado: string = '';

  constructor(private pedidoService: PedidoService) {}

  onTipoChange() {
    this.valorConsulta = this.tipoConsulta === 'dia' ? 'Monday' : 'January';
    this.ventas$ = null;
    this.detalles$ = null;
  }

  consultar() {
    if (!this.valorConsulta) return;
    if (this.tipoConsulta === 'dia') {
      this.ventas$ = this.pedidoService.getVentasPorDia(DIAS[this.valorConsulta]);
    } else {
      this.ventas$ = this.pedidoService.getVentasPorMes(MESES[this.valorConsulta]);
    }
    this.detalles$ = null;
  }

  verDetalle(pedido: Pedido) {
    this.pedidoSeleccionado = pedido.nombre_cliente;
    this.detalles$ = this.pedidoService.getDetallesPedido(pedido.id);
  }

  cerrarDetalle() {
    this.detalles$ = null;
  }
}