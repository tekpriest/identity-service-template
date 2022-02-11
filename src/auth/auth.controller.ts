import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ErrorResponse } from '../utils/error.response';
import { SuccessResponse } from '../utils/success.response';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private userService: UsersService,
    private successResponse: SuccessResponse,
    private errorResponse: ErrorResponse,
  ) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'User successfully registered',
  })
  @ApiOperation({ summary: 'register a user' })
  async registerUser(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const errors = await this.service.isUserExist(createUserDto);
      if (errors.length > 0) {
        return this.errorResponse.badRequestResponse(
          res,
          'account cannot be created',
          errors,
        );
      }
      const user = await this.userService.create(createUserDto);
      return res.status(201).send({
        message: 'Account successfully created',
        data: { user },
      });
    } catch (error) {
      return this.errorResponse.serverErrorResponse(
        res,
        'an error occured',
        error,
      );
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'log in as a user' })
  @ApiOkResponse({
    description: 'User logged in successfully',
  })
  async login(
    @Req() req: { ip: string },
    @Body() loginDto: LoginDto,
    @Res() res,
  ) {
    try {
      const validatePassword = await this.service.validatePassword(loginDto);
      if (!validatePassword) {
        return this.errorResponse.badRequestResponse(
          res,
          'invalid credentials',
        );
      }
      const { tokenData, user } = await this.service.createToken(
        loginDto.email,
        req.ip,
      );
      return this.successResponse.okResponse(res, 'login successful', {
        tokenData,
        user,
      });
    } catch (error) {
      console.log(error);
      return this.errorResponse.serverErrorResponse(
        res,
        'an error occurred',
        error,
      );
    }
  }
}
