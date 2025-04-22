import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { ItemPedido } from './item-pedido.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  usuario!: Usuario;

  @Column()
  status!: string;

  @Column()
  enderecoEntrega!: string;

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.pedido)
  itens!: ItemPedido[];
}