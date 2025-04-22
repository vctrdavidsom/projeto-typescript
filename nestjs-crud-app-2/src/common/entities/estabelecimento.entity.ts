import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  endereco!: string;

  @Column()
  telefone!: string;
}