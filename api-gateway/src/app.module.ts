import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  controllers: [UserController],
})
export class AppModule {}
