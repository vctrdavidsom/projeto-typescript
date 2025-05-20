import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  weight?: number;

  @Column({ nullable: true })
  unit?: string; // kg, unidade, etc.

  @Column({ nullable: true })
  expirationDate?: Date;

  @Column('int', { default: 0 })
  stockQuantity!: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  seasonality?: string; // ex: "Verão", "Ano todo"

  @ManyToOne(() => Category, (category) => category.products, { 
    onDelete: 'RESTRICT',
    nullable: false 
  })
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: 0 })
  rating!: number;

  @Column({ default: 0 })
  ratingCount!: number;
}