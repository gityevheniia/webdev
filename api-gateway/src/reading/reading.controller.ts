import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Param,
    Res,
    HttpStatus,
  } from '@nestjs/common';
  import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
  import { CreateReadingDto } from 'src/reading/dto/create-reading.dto';
  import { UpdateReadingDto } from 'src/reading/dto/update-reading.dto';
  import { Response } from 'express';
  
  @Controller('reading-progress')
  export class ReadingController {
    constructor(private readonly rabbitService: RabbitMQService) {}
  
    @Post()
    async create(@Body() dto: CreateReadingDto, @Res() res: Response) {
      try {
        const result = await this.rabbitService.send('reading_create', dto);
        return res.status(HttpStatus.CREATED).json(result);
      } catch (e) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
      }
    }
  
    @Get(':userId')
    async getByUser(@Param('userId') userId: string, @Res() res: Response) {
      try {
        const result = await this.rabbitService.send('reading_get_by_user', userId);
        return res.status(HttpStatus.OK).json(result);
      } catch (e) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: e.message });
      }
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() dto: UpdateReadingDto,
      @Res() res: Response,
    ) {
      try {
        const result = await this.rabbitService.send('reading_update', {
          id,
          ...dto,
        });
        return res.status(HttpStatus.OK).json(result);
      } catch (e) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
      }
    }
  }
  