import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class SuccessResponse {
  createdResponse(res: Response, data: any, message: string) {
    return res.status(HttpStatus.CREATED).send({
      status: true,
      statusCode: HttpStatus.CREATED,
      message,
      data,
    });
  }

  okResponse(res: Response, message: string, data?: any) {
    return res.status(HttpStatus.OK).send({
      status: true,
      statusCode: HttpStatus.OK,
      message,
      data,
    });
  }
}
