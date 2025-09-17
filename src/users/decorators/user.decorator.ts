import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to get the user UUID from the request object
 * @returns {string} - The user UUID
 *
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.uuid;
});
