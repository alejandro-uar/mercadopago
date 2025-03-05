import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhook')
  async handleWebhook(@Body() data: any) {
    await this.paymentService.handleWebhook(data);
    return { message: 'Webhook received' };
  }
}
