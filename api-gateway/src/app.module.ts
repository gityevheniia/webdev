import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { BookController } from './book/book.controller';
import {ReadingController} from './reading/reading.controller';

@Module({
  imports: [RabbitMQModule],
  controllers: [UserController, BookController, ReadingController],
})
export class AppModule {}
