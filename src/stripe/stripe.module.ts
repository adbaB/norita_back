import { Module } from '@nestjs/common';
import { StripeController } from './controllers/stripe.controller';
import { StripeWebhookController } from './controllers/webhook.controller';
import { StripeService } from './services/stripe.service';

@Module({
  controllers: [StripeController, StripeWebhookController],
  providers: [StripeService],
  exports: [],
})
export class StripeModule {}
