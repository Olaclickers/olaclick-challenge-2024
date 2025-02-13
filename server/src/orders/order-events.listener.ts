import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Injectable()
export class OrderEventsListener implements OnModuleInit {
  private rabbitMQClient: ClientProxy;

  constructor(private readonly ordersService: OrdersService) {
    this.rabbitMQClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
        queue: 'orders_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async onModuleInit() {
    await this.rabbitMQClient.connect();  // Conectar a RabbitMQ
    this.rabbitMQClient.emit('order_updated', {});  // Enviar el evento

    // Escuchar el evento, si es necesario
    this.rabbitMQClient.send('order_updated', {}).subscribe(async (message) => {
      console.log(`Orden actualizada: ${JSON.stringify(message)}`);
      // Aquí podrías procesar más lógica si es necesario
    });
  }
}
