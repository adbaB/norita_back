import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { WebhookService } from '../services/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthorizationGuard)
  async webhook(@Body() body: Record<string, unknown>): Promise<void> {
    const event = body?.event;
    if (!event || typeof event !== 'object' || Array.isArray(event)) {
      throw new BadRequestException('Invalid webhook payload: missing event object');
    }
    return this.webhookService.processRevenueCatEvent(event as Record<string, unknown>);
  }
}
