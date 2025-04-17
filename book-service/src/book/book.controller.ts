import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern('book_create')
  create(data: CreateBookDto) {
    return this.bookService.create(data);
  }

  @MessagePattern('book_get_all')
  findAll(data: FilterBookDto) {
    return this.bookService.findAll(data);
  }

  @MessagePattern('book_get_by_id')
  findById(id: string) {
    return this.bookService.findById(id);
  }

  @MessagePattern('book_update')
  update(data: { id: string } & UpdateBookDto) {
    const { id, ...dto } = data;
    return this.bookService.update(id, dto);
  }
}
