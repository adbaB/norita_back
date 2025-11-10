import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm';

type DatabaseError = {
  code?: string;
  errno?: number;
  sqlState?: string;
  sqlMessage?: string;
};

@Catch()
export class TypeormFilterCatch implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error';
    let errorCode: string | undefined;

    if (exception instanceof QueryFailedError) {
      // Type assertion para acceder a driverError
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const queryError = exception as any;
      const driverError: DatabaseError = queryError.driverError || {};

      errorCode = driverError.code;

      // Mapear códigos de error a respuestas HTTP
      const errorMap: Record<string, { status: number; message: string }> = {
        '23505': { status: HttpStatus.CONFLICT, message: 'Duplicate entry' },
        ER_DUP_ENTRY: { status: HttpStatus.CONFLICT, message: 'Duplicate entry' },
        '23503': { status: HttpStatus.BAD_REQUEST, message: 'Foreign key constraint violation' },
        '23502': { status: HttpStatus.BAD_REQUEST, message: 'Not null constraint violation' },
        '22P02': { status: HttpStatus.BAD_REQUEST, message: 'Invalid input syntax' },
      };

      const mappedError = errorCode ? errorMap[errorCode] : null;

      if (mappedError) {
        status = mappedError.status;
        message = mappedError.message;
      } else {
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'Database query failed';
      }
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Resource not found';
    } else if (exception instanceof CannotCreateEntityIdMapError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = 'Invalid entity data';
    }

    response.status(status).json({
      statusCode: status,
      message,
      ...(errorCode && { errorCode }),
      timestamp: new Date().toISOString(),
    });
  }
}
