import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id: number;
  nombre_cliente: string;
  direccion: string;
  telefono: string;
  fecha_pedido: string;
  total: number;
}

export interface DetallePedido {
  id: number;
  pedido_id: number;
  tamano: string;
  ingredientes: string;
  num_pizzas: number;
  subtotal: number;
}

export interface VentasResponse {
  ventas: Pedido[];
  total: number;
  exito: boolean;
}

export interface DetallesResponse {
  detalles: DetallePedido[];
  mensaje: string;
  exito: boolean;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  guardarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar_pedido`, pedido);
  }

  getVentasPorDia(dia: number): Observable<VentasResponse> {
    return this.http.get<VentasResponse>(`${this.apiUrl}/ventas/dia?dia=${dia}`);
  }

  getVentasPorMes(mes: number): Observable<VentasResponse> {
    return this.http.get<VentasResponse>(`${this.apiUrl}/ventas/mes?mes=${mes}`);
  }

  getDetallesPedido(id: number): Observable<DetallesResponse> {
    return this.http.get<DetallesResponse>(`${this.apiUrl}/pedidos/${id}/detalles`);
  }
}