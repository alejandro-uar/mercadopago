import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() data: any) {
    return this.orderService.createOrder(data);
  }

  @Get()
  async getOrders() {
    return this.orderService.getOrders();
  }

}
