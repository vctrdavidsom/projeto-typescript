import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  produtoId!: number;

  @Column()
  quantidade!: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  pedido!: Pedido;
}