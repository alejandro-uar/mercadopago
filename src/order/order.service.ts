import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { read } from 'fs';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrderService {
    
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        private readonly paymentService: PaymentService
    ) {}

    async createOrder(data: any) {
        const newOrder = new Order()
        newOrder.amount = data.amount
        await this.orderRepository.save(newOrder)

        const paymentPreference = await this.paymentService.createPaymentPreference(newOrder)
            
        return paymentPreference 

    }

    async getOrders() {
        return [];
    }
}
