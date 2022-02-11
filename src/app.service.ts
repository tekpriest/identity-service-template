import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  isAlive(): string {
    return 'Right here';
  }
}
