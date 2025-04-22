import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Entrega {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pedidoId!: number;

  @Column()
  status!: string;

  @Column()
  dataEntrega!: Date;
}