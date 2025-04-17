import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  create(dto: CreateBookDto) {
    const book = this.repo.create(dto);
    return this.repo.save(book);
  }

  findAll(filter: FilterBookDto) {
    const query = this.repo.createQueryBuilder('book');

    if (filter.genre) query.andWhere('book.genre = :genre', { genre: filter.genre });
    if (filter.author) query.andWhere('book.author = :author', { author: filter.author });
    if (filter.publication_year) query.andWhere('book.publication_year = :year', { year: filter.publication_year });

    return query.getMany();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateBookDto) {
    await this.repo.update(id, dto);
    return this.findById(id);
  }
}
