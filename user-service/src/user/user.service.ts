import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashedPassword });
    return this.repo.save(user);
  }

  async login(dto: LoginDto) {
    const user = await this.repo.findOneBy({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, 'JWT_SECRET', { expiresIn: '1h' });
    return { token };
  }
}
