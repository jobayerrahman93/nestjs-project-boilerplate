import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch()
export class CustomGlobalErrorExceptionFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message =
        exception.getResponse()['message'] || exception.message || message;
    } else if (exception instanceof ValidationError) {
      console.log('exception in validation error');
      status = HttpStatus.BAD_REQUEST;
      message = this.getValidationErrorMessage(exception);
    } else if (exception instanceof Error) {
      console.log('exception in error');
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    const { httpAdapter } = this.httpAdapterHost;

    console.log({ message });

    const body = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    httpAdapter.reply(response, body, status);
  }

  private getValidationErrorMessage(exception: ValidationError): string {
    console.log('getvalidation');
    const constraints = exception.constraints;
    const errorMessages = Object.values(constraints).join(', ');
    return errorMessages;
  }
}
