import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadingProgress } from './reading.entity';
import { Repository } from 'typeorm';
import { CreateReadingDto  } from './dto/create-reading-progress.dto';
import { UpdateReadingDto  } from './dto/update-reading-progress.dto';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(ReadingProgress)
    private repo: Repository<ReadingProgress>,
  ) {}

  // Створення нового запису прогресу читання
  create(dto: CreateReadingDto ) {
    const progress = this.repo.create({
      ...dto,
      updated_at: new Date(),
    });
    return this.repo.save(progress);
  }

  // Отримання всіх книг, які читає користувач
  getByUserId(userId: string) {
    return this.repo.find({
      where: { user_id: userId },
      order: { updated_at: 'DESC' },
    });
  }

  // Оновлення прогресу читання
  async update(id: string, dto: UpdateReadingDto ) {
    await this.repo.update(id, {
      ...dto,
      updated_at: new Date(),
    });
    return this.repo.findOne({ where: { id } });
  }

  async findByUser(userId: string) {
    return this.repo.find({
      where: { user_id: userId },
      order: { updated_at: 'DESC' }, // за бажанням
    });
  }
}
