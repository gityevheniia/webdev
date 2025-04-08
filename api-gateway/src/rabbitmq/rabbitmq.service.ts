import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}
