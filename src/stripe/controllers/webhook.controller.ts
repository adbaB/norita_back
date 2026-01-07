import { Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { StripeService } from '../services/stripe.service';

@Controller('/webhook')
export class StripeWebhookController {
  constructor(private readonly stripeService: StripeService) {}

  @IsPublic()
  @Post()
  webhook(@Req() req: RawBodyRequest<Request>, @Headers('stripe-signature') sig: string): void {
    this.stripeService.handleWebhook(req, sig);
  }
}
