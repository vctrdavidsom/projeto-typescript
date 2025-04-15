import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get(':name')
  getProductByName(@Param('name') name: string) {
    return this.productsService.findOneByName(name);
  }

  @Put(':name')
  updateProduct(@Param('name') name: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateByName(name, updateProductDto);
  }

  @Delete(':name')
  deleteProduct(@Param('name') name: string) {
    return this.productsService.removeByName(name);
  }
}