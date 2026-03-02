import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
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
    return this.webhookService.processRevenueCatEvent(body.event as Record<string, unknown>);
  }
}
