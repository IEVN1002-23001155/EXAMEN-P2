import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RegistroPedido } from './components/registro-pedido/registro-pedido';
import { DatosCliente } from './components/datos-cliente/datos-cliente';
import { SeleccionPizza } from './components/seleccion-pizza/seleccion-pizza';
import { DetallePedido } from './components/detalle-pedido/detalle-pedido';
import { ConsultasVentas } from './components/consultas-ventas/consultas-ventas';
import { FlashMessage } from './components/flash-message/flash-message';

@NgModule({
  declarations: [
    App,
    RegistroPedido,
    DatosCliente,
    SeleccionPizza,
    DetallePedido,
    ConsultasVentas,
    FlashMessage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }