import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../common/entities/product.entity'; // Corrigido
import { Category } from '../common/entities/category.entity'; // Adicionado
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({ id: createProductDto.categoryId });
    if (!category) throw new Error('Category not found');
    const product = this.productRepository.create({ ...createProductDto, category });
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  findOneByName(name: string): Promise<Product | null> {
    return this.productRepository.findOne({ where: { name }, relations: ['category'] });
  }

  async updateByName(name: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const product = await this.findOneByName(name);
    if (!product) return null;
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async removeByName(name: string): Promise<boolean> {
    const result = await this.productRepository.delete({ name });
    return result.affected ? result.affected > 0 : false;
  }
}