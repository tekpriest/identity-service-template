import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from '@prisma/client';
import { LoginDto } from 'src/dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Check if user exists
   * @param data
   * @returns
   */
  async isUserExist(data: CreateUserDto) {
    const errors = [];
    if (await this.userService.findOneByEmail(data.email.toLocaleLowerCase()))
      errors.push({ email: 'Email already in use' });
    if (await this.userService.findOneByPhoneNumber(data.phoneNumber))
      errors.push({ phoneNumber: 'Phone number already in use' });
    return errors;
  }

  async validatePassword(data: LoginDto) {
    const user = await this.userService.findOneByEmail(
      data.email.toLowerCase(),
    );
    if (!user) return false;
    return this.userService.checkPasswordMatch(data.password, user.password);
  }

  async createToken(email: string, ip: string) {
    const user = await this.userService.findOneByEmail(email.toLowerCase());
    const token = this.jwtService.sign({
      id: user.id,
    });
    const tokenData = await this.saveAuthToken(user.id, token, ip);
    return { user, tokenData };
  }

  /**
   * Find auth token saved to a user
   * @param {string} token generated token
   * @returns {Promise<{AuthToken | null}>}
   */
  async findAuthToken(token: string): Promise<AuthToken | null> {
    return await this.prisma.authToken.findUnique({ where: { token } });
  }

  /**
   * Create an auth token for logged in user
   * @param ownerId
   * @param token
   * @param ip
   * @returns {Promise<{AuthToken | null}>}
   */
  async saveAuthToken(
    ownerId: string,
    token: string,
    ip: string,
  ): Promise<AuthToken> {
    return await this.prisma.authToken.create({
      data: {
        ownerId,
        token,
        ip,
      },
    });
  }

  /**
   * Delete a auth token
   * @param token
   * @returns {Promise<{AuthToken | null}>}
   */
  async deleteAuthToken(token: string): Promise<AuthToken> {
    return await this.prisma.authToken.delete({ where: { token } });
  }
}
