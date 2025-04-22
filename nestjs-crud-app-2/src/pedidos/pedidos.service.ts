import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../common/entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  create(pedido: Pedido): Promise<Pedido> {
    return this.pedidoRepository.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }

  findOne(id: number): Promise<Pedido | null> {
    return this.pedidoRepository.findOneBy({ id });
  }

  async update(id: number, pedido: Partial<Pedido>): Promise<Pedido | null> {
    const existingPedido = await this.findOne(id);
    if (!existingPedido) return null;
    Object.assign(existingPedido, pedido);
    return this.pedidoRepository.save(existingPedido);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pedidoRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}