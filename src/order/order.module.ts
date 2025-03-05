import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PaymentModule
  ],
  controllers: [OrderController],
  providers: [OrderService, PaymentService],
})
export class OrderModule {}
