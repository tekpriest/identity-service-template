import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    data.email = data.email.toLowerCase();
    data.password = this.hash(data.password);

    return await this.prisma.user.create({
      data,
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findOneByPhoneNumber(phoneNumber: string) {
    return await this.prisma.user.findFirst({
      where: { phoneNumber },
    });
  }

  hash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  checkPasswordMatch(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
