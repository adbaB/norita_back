/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginatedResponse } from '../responses';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // Si ya es una respuesta estándar, la dejamos tal cual
        if (data instanceof ApiResponse || data instanceof PaginatedResponse) {
          return data;
        }

        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        // Determinar mensaje por defecto según el método HTTP
        const defaultMessage = this.getDefaultMessage(request.method);

        // Para respuestas paginadas
        if (data?.items !== undefined && data?.info) {
          const message = data.message || defaultMessage;
          return new PaginatedResponse(true, message, data.items, data.meta);
        }

        // Para respuestas que ya tienen estructura con mensaje
        if (data?.message !== undefined && data?.data !== undefined) {
          return new ApiResponse(true, data.message, data.data);
        }

        // Para datos simples - usar mensaje por defecto
        return new ApiResponse(true, defaultMessage, data);
      }),
    );
  }
  private getDefaultMessage(method: string): string {
    switch (method) {
      case 'GET':
        return 'Resource retrieved successfully';
      case 'POST':
        return 'Resourse created successfully';
      case 'PUT':
        return 'Resource updated successfully';
      case 'PATCH':
        return 'Resource patched successfully';
      case 'DELETE':
        return 'Resource deleted successfully';
      default:
        return 'Success';
    }
  }
}
