import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../common/entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Category | null> {
    return this.categoriesService.findOneByName(name);
  }

  @Put(':name')
  update(@Param('name') name: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    return this.categoriesService.updateByName(name, updateCategoryDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string): Promise<boolean> {
    return this.categoriesService.removeByName(name);
  }
}