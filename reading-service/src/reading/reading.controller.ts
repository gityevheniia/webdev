import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReadingService } from './reading.service';
import { CreateReadingDto } from 'src/reading/dto/create-reading-progress.dto';
import { UpdateReadingDto } from 'src/reading/dto/update-reading-progress.dto';

@Controller()
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @MessagePattern('reading_create')
  create(data: CreateReadingDto) {
    return this.readingService.create(data);
  }

  @MessagePattern('reading_get_by_user')
  findByUser(userId: string) {
    return this.readingService.findByUser(userId);
  }

  @MessagePattern('reading_update')
  update(data: { id: string } & UpdateReadingDto) {
    const { id, ...dto } = data;
    return this.readingService.update(id, dto);
  }
}
