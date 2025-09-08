import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  console.log(request.user);
  // Asume que el JWT está decodificado y disponible en `request.user`
  return request.user?.uuid; // Ajusta 'uuid' según la propiedad donde esté almacenado
});
