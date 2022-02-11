import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SuccessResponse } from './utils/success.response';

@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly successResponse: SuccessResponse,
  ) {}

  @Get()
  isAlive(@Req() req, @Res() res): string {
    return res.status(200).send({
      status: true,
      message: 'Auth Service is live',
      currentTime: new Date(Date.now()).toISOString(),
    });
  }
}
