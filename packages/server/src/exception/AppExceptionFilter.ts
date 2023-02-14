import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {Request, Response} from 'express';
import {AppException} from "./AppException";

@Catch(Error)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = 500;
    console.log(exception);
    response
      .status(status || 500)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message
      });
  }
}