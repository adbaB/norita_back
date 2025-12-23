import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { StripeService } from '../services/stripe.service';

@Controller('payment')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @IsPublic()
  @Post('/create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number): Promise<{ clientSecret: string }> {
    console.log(amount);
    return this.stripeService.createPaymentIntent(amount);
  }
}
