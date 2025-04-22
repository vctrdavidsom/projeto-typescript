import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pedidoId!: number;

  @Column()
  valor!: number;

  @Column()
  status!: string;
}