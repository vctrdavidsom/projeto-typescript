import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cupom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  codigo!: string;

  @Column()
  desconto!: number;

  @Column()
  validade!: Date;
}