import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ErrorResponse {
  notFoundResponse(res: Response, message: string, error?: string) {
    return res.status(404).send({
      status: false,
      statusCode: HttpStatus.NOT_FOUND,
      message,
      error,
    });
  }

  badRequestResponse(res: Response, message: string, error?: any) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      status: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error,
    });
  }

  unauthorizedResponse(res: Response, message: string) {
    return res.status(HttpStatus.UNAUTHORIZED).send({
      status: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      message,
    });
  }

  serverErrorResponse(res: Response, message: string, error: any) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      error: error || error.message || error.stack || error.name,
    });
  }
}
