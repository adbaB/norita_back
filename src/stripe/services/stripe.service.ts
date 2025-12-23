import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Stripe from 'stripe';
import configuration from '../../config/configuration';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor(
    @Inject(configuration.KEY) private readonly configService: ConfigType<typeof configuration>,
  ) {
    this.stripe = new Stripe(this.configService.stripe.secretKey, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    });
  }

  async createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    // Stripe maneja cantidades en centavos (ej: 1000 = $10.00)
    console.log(amount);
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    console.log(paymentIntent);
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
