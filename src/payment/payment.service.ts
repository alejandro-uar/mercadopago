import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { Order } from 'src/order/entity/order.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    
    private client: MercadoPagoConfig
    
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {
        this.client = new MercadoPagoConfig({
          accessToken: process.env.ACCES_TOKEN_PAYMENT,
        });
    }

    async createPaymentPreference(order: Order) {
        const body = {
            items: [
                {
                    id: order.id,
                    title: "Order Payment",
                    quantity: 1,
                    unit_price: order.amount,
                },
            ],
            back_urls: {
                success: '',
                failure: '',
            },
            notification_url: '',
            metadata: {order_id: order.id},
        }

        const preference = new Preference(this.client)
        const result = await preference.create({body})
        
        return {init_point: result.init_point}

    }


    async handleWebhook(data: any): Promise<void> {
        const paymentId = data.data?.id; // ID del pago que manda Mercado Pago
        if (!paymentId) return;
      
        const response = await axios.get(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: { Authorization: `Bearer ${process.env.ACCES_TOKEN_PAYMENT}` },
          },
        );
      
        const status = response.data.status; // 'approved', 'pending', 'rejected', etc.
        const orderId = response.data.metadata?.order_id; // ID de la orden que guardamos en metadata
      
        if (orderId) {
          const order = await this.orderRepository.findOne({ where: { id: orderId } });
          if (order) {
            order.status = status; // Actualiza el estado de la orden
            await this.orderRepository.save(order);
          }
        }
      }
      
}
