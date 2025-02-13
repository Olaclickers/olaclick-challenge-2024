import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('orders')
export class OrdersProcessor {
  private readonly logger = new Logger(OrdersProcessor.name);

  @Process('orderCreated')
  async handleOrderCreated(job: Job) {
    this.logger.log(`Procesando creación de orden, ID: ${job.data.orderId}`);
  }

  @Process('orderStatusUpdated')
  async handleOrderStatusUpdated(job: Job) {
    this.logger.log(`Estado actualizado de orden ${job.data.orderId}: ${job.data.status}`);
  }
}