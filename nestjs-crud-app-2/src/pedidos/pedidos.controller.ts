import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from '../common/entities/pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() pedido: Pedido): Promise<Pedido> {
    return this.pedidosService.create(pedido);
  }

  @Get()
  findAll(): Promise<Pedido[]> {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Pedido | null> {
    return this.pedidosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() pedido: Partial<Pedido>): Promise<Pedido | null> {
    return this.pedidosService.update(id, pedido);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.pedidosService.remove(id);
  }
}