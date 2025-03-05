import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import { config } from 'dotenv';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
    }),
    PaymentModule, 
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
