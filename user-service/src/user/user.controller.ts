import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_register')
  register(data: RegisterDto) {
    return this.userService.register(data);
  }

  @MessagePattern('user_login')
  login(data: LoginDto) {
    return this.userService.login(data);
  }
}
