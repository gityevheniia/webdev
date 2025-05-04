import { Body, Controller, Post, Get, Put, Param, Query, Res, HttpStatus } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto'; 
import { Response } from 'express';

@Controller('books')
export class BookController {
  constructor(private readonly rabbitService: RabbitMQService) {}

  // Створення нової книги (тільки для адміністратора)
  @Post()
  async create(@Body() dto: CreateBookDto, @Res() res: Response) {
    try {
      const result = await this.rabbitService.send('book_create', dto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  // Отримання списку книг з фільтрами
  @Get()
  async findAll(@Query() query: FilterBookDto, @Res() res: Response) {
    try {
      const result = await this.rabbitService.send('book_get_all', query);
      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  // Отримання книги за ID
  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.rabbitService.send('book_get_by_id', id);
      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: e.message });
    }
  }

  // Оновлення книги за ID (тільки для адміністратора)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookDto, @Res() res: Response) {
    try {
      const result = await this.rabbitService.send('book_update', { id, ...dto });
      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}
