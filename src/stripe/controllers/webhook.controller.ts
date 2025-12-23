import { Controller, Post, Req } from '@nestjs/common';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';

@Controller('/webhook')
export class StripeWebhookController {
  @IsPublic()
  @Post()
  webhook(@Req() req: Request): void {
    console.log(req);
  }
}
