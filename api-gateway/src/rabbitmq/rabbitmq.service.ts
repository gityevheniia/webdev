import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('BOOK_SERVICE') private readonly bookClient: ClientProxy,
    @Inject('READING_SERVICE') private readonly readingClient: ClientProxy, 
  ) {}

  async send(pattern: string, data: any) {
    if (pattern.startsWith('user_')) {
      return this.userClient.send(pattern, data).toPromise();
    } else if (pattern.startsWith('book_')) {
      return this.bookClient.send(pattern, data).toPromise();
    } else if (pattern.startsWith('reading_')) { 
      return this.readingClient.send(pattern, data).toPromise();
    }
  }
}
