import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppLoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { ErrorResponse } from './utils/error.response';
import { SuccessResponse } from './utils/success.response';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ErrorResponse, SuccessResponse],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
