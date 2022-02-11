import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ErrorResponse } from '../utils/error.response';
import { SuccessResponse } from '../utils/success.response';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  providers: [UsersService, PrismaService, SuccessResponse, ErrorResponse],
})
export class UsersModule {}
