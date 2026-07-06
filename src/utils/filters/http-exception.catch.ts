import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../responses';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as Record<string, unknown>).message as string) || exception.message;

      if (status >= 500) {
        this.logger.error(
          `[${request.method}] ${request.url} → ${status} ${message}`,
          exception instanceof Error ? exception.stack : String(exception),
        );
      } else {
        this.logger.warn(`[${request.method}] ${request.url} → ${status} ${message}`);
      }
    } else {
      // Excepción inesperada (no HTTP)
      this.logger.error(
        `[${request.method}] ${request.url} → Unexpected exception`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(status).json(new ApiResponse(false, message, null, new Date().toISOString()));
  }
}
