import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly rabbitService: RabbitMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    try {
      const result = await this.rabbitService.send('user_register', dto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.rabbitService.send('user_login', dto);
      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }
}
