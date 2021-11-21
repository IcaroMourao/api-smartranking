import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(excepetion: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const status =
      excepetion instanceof HttpException
        ? excepetion.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = excepetion instanceof HttpException ? excepetion.getResponse() : excepetion;

    this.logger.error(`Http Status: ${status}, Error Message: ${JSON.stringify(message)}`);

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
