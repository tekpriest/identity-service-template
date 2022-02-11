import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './auth/constants';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { SuccessResponse } from './utils/success.response';

process.env.DATABASE_URL =
  'postgresql://postgres:password@localhost:5432/auth_service?schema=public';

const res = {
  status: (code: number) => res,
  send: (npdy?: any) => {
    // ...
  },
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
      ],
      providers: [
        AppService,
        AuthService,
        UsersService,
        PrismaService,
        SuccessResponse,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  process.env.DATABASE_URL =
    'postgresql://postgres:password@localhost:5432/auth_service?schema=public';

  describe('root', () => {
    it('should return "Right here!"', () => {
      expect(appController.isAlive).toBeDefined();
    });
  });
});
