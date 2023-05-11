import { ExceptionFilter, Catch, HttpException, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        path: request.url,
      });
    } else {
      Logger.error(exception);
      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        path: request.url,
      });
    }
  }
}
