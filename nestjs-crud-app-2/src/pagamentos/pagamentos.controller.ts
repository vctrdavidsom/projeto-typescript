import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { Pagamento } from '../common/entities/pagamento.entity';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  create(@Body() pagamento: Pagamento): Promise<Pagamento> {
    return this.pagamentosService.create(pagamento);
  }

  @Get()
  findAll(): Promise<Pagamento[]> {
    return this.pagamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Pagamento | null> {
    return this.pagamentosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() pagamento: Partial<Pagamento>): Promise<Pagamento | null> {
    return this.pagamentosService.update(id, pagamento);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.pagamentosService.remove(id);
  }
}