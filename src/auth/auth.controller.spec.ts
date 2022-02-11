import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthToken, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ErrorResponse } from '../utils/error.response';
import { SuccessResponse } from '../utils/success.response';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

process.env.DATABASE_URL =
  'postgresql://postgres:password@localhost:5432/auth_service?schema=public';

const res = {
  status: (code: number) => res,
  send: (body?: any) => {
    // ...
  },
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let userService: UsersService;

  const createUserDto: CreateUserDto = {
    email: 'john@doe.com',
    phoneNumber: '+234809090489',
    firstName: 'John',
    lastName: ' Doe',
    password: 'inevitableSuccess@1',
    country: 'NG',
    dob: new Date(Date.now() + 40).toISOString(),
  };

  const newUserResponse: User = {
    id: 'cktbha87m0000tdltnh0woepr',
    email: 'john@doe.com',
    firstName: 'John',
    lastName: 'Doe',
    country: 'NG',
    isVerified: true,
    phoneNumber: '+2348090893221',
    role: 'user',
    password: 'johnSnow',
    dob: new Date(Date.now() + 40),
    isActive: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    deletedAt: new Date(Date.now()),
  };

  const authData = {
    headers: {
      authorization: `Bearer ey303vn03n20nvo3i20v03m2v0230m30023mv03v02vn20v0320v3n203vn03020v2v`,
    },
  };

  const authTokenResponse: AuthToken = {
    token: authData.headers['authorization'],
    createdAt: new Date(Date.now()),
    ip: '127.0.0.1',
    ownerId: newUserResponse.id,
  };

  beforeEach(async () => {
    const authServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        findAuthToken: jest.fn(() => authTokenResponse),
        saveAuthToken: jest.fn(() => authTokenResponse),
        deleteAuthToken: jest.fn(() => authTokenResponse),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
      ],
      providers: [UsersService, PrismaService, ErrorResponse, SuccessResponse],
    }).compile();

    service = app.get<AuthService>(AuthService);
    userService = app.get<UsersService>(UsersService);
    controller = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register user', async () => {
    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);
    jest.spyOn(userService, 'findOneByPhoneNumber').mockResolvedValue(null);
    jest.spyOn(userService, 'create').mockResolvedValue(newUserResponse);
    controller.registerUser(createUserDto, res);
    expect(userService.findOneByEmail).toHaveBeenCalledTimes(1);
  });

  it('should login user', async () => {
    jest
      .spyOn(userService, 'findOneByEmail')
      .mockResolvedValue(newUserResponse);
    jest
      .spyOn(userService, 'findOneByPhoneNumber')
      .mockResolvedValue(newUserResponse);
    jest.spyOn(userService, 'create').mockResolvedValue(newUserResponse);

    await controller.registerUser(createUserDto, res);
    await controller.login(
      { ip: '127.0.0.1' },
      {
        email: createUserDto.email,
        password: 'IAmTheMVPApp',
      },
      res,
    );

    expect(userService.findOneByEmail).toHaveBeenCalledWith(
      createUserDto.email,
    );
  });
});
