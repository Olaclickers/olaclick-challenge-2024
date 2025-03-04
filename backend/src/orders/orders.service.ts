import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem, OrderItemCreationAttributes } from './order-items/entities/order-item.entity';
import { CreateOrderItemDto } from './order-items/dto/create-order-item.dto';

@Injectable()
export class OrdersService {
  // Allowed status transitions
  private readonly STATUS_TRANSITIONS: Record<string, string[]> = {
    initiated: ['sent'],
    sent: ['delivered'],
    delivered: []
  };

  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(OrderItem)
    private orderItemModel: typeof OrderItem,
    private sequelize: Sequelize,
  ) {}

  private validateOrderItems(items?: CreateOrderItemDto[]): void {
    if (!items || items.length === 0) {
      return; // Early return if no items
    }

    items.forEach((item, index) => {
      if (item.price <= 0) {
        throw new BadRequestException(`Order item at index ${index}: Price must be positive`);
      }
      if (item.quantity <= 0) {
        throw new BadRequestException(`Order item at index ${index}: Quantity must be positive`);
      }
    });
  }

  private calculateTotalPrice(items?: CreateOrderItemDto[]): number {
    if (!items || items.length === 0) {
      return 0;
    }
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll({
      where: {
        status: {
          [Op.ne]: 'delivered'
        }
      },
      include: [OrderItem]
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [OrderItem]
    });
    
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    // First, check if order exists before starting transaction
    const existingOrder = await this.orderModel.findByPk(id);

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    // Start a transaction
    const transaction = await this.sequelize.transaction();

    try {
      // Find the order within the transaction (we know it exists from previous check)
      const order = await this.orderModel.findByPk(id, { 
        transaction,
        include: [OrderItem] 
      }) as Order;  // Assert non-null type

      // Validate order items if provided
      if (updateOrderDto.orderItems) {
        this.validateOrderItems(updateOrderDto.orderItems);
      }

      // Calculate total price if items are updated
      const totalPrice = updateOrderDto.orderItems 
        ? this.calculateTotalPrice(updateOrderDto.orderItems) 
        : existingOrder.totalPrice;

      // Update order attributes
      await order.update({
        customerName: updateOrderDto.customerName ?? existingOrder.customerName,
        status: updateOrderDto.status ?? existingOrder.status,
        details: updateOrderDto.details ?? existingOrder.details,
        totalPrice: totalPrice
      }, { transaction });

      // If order items are provided, update order items
      if (updateOrderDto.orderItems) {
        // Destroy existing order items
        await this.orderItemModel.destroy({ 
          where: { orderId: id },
          transaction 
        });
        
        // Prepare and create new order items using creation attributes
        const orderItemsToCreate: OrderItemCreationAttributes[] = updateOrderDto.orderItems.map(itemDto => ({
          name: itemDto.name,
          price: itemDto.price,
          quantity: itemDto.quantity,
          orderId: id
        }));

        // Create new order items within the transaction
        await this.orderItemModel.bulkCreate(orderItemsToCreate as any[], { 
          transaction,
          validate: true 
        });
      }

      // Commit the transaction
      await transaction.commit();

      // Return the updated order
      return this.findOne(id);
    } catch (error) {
      // Rollback the transaction if anything goes wrong
      await transaction.rollback();
      throw error;
    }
  }

  async updateOrderStatus(id: number, newStatus: 'initiated' | 'sent' | 'delivered'): Promise<Order> {
    // Find the order first
    const order = await this.orderModel.findByPk(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Validate status transition
    const currentStatus = order.status as keyof typeof this.STATUS_TRANSITIONS;
    const validTransitions = this.STATUS_TRANSITIONS[currentStatus] || [];

    if (!validTransitions.includes(newStatus)) {
      throw new BadRequestException(`Invalid status transition from ${currentStatus} to ${newStatus}`);
    }

    // Update the order status using the model's update method
    await this.orderModel.update(
      { status: newStatus }, 
      { where: { id } }
    );

    // Fetch and return the updated order to ensure the new status is returned
    const updatedOrder = await this.orderModel.findByPk(id);
  
    // Add null check to satisfy TypeScript and ensure order exists
    if (!updatedOrder) {
      throw new NotFoundException('Order not found after update');
    }
  
    return updatedOrder;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Validate order items
    this.validateOrderItems(createOrderDto.orderItems);

    // Calculate total price
    const totalPrice = this.calculateTotalPrice(createOrderDto.orderItems);

    // Start a transaction
    const transaction = await this.sequelize.transaction();

    try {
      // Create the order within the transaction
      const order = await this.orderModel.create({
        customerName: createOrderDto.customerName,
        details: createOrderDto.details,
        status: 'initiated',
        totalPrice: totalPrice
      }, { transaction });

      // If order items exist, create them
      if (createOrderDto.orderItems && createOrderDto.orderItems.length > 0) {
        const orderItemsToCreate: OrderItemCreationAttributes[] = createOrderDto.orderItems.map(itemDto => ({
          name: itemDto.name,
          price: itemDto.price,
          quantity: itemDto.quantity,
          orderId: order.id
        }));

        // Create order items within the transaction
        await this.orderItemModel.bulkCreate(orderItemsToCreate as any[], { 
          transaction,
          validate: true 
        });
      }

      // Commit the transaction
      await transaction.commit();

      // Return the created order with its items
      return this.findOne(order.id);
    } catch (error) {
      // Rollback the transaction if anything goes wrong
      await transaction.rollback();
      
      // Rethrow the original error with a more descriptive message
      throw new Error('Database transaction failed: ' + error.message);
    }
  }

  async addOrderItem(orderId: number, orderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    // Validate the order item
    if (orderItemDto.price <= 0) {
      throw new BadRequestException('Order item price must be positive');
    }
    if (orderItemDto.quantity <= 0) {
      throw new BadRequestException('Order item quantity must be positive');
    }

    // Find the order first
    const order = await this.orderModel.findByPk(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if order is still in a state where items can be added
    if (order.status !== 'initiated') {
      throw new BadRequestException(`Cannot add items to an order with status ${order.status}`);
    }

    // Start a transaction
    const transaction = await this.sequelize.transaction();

    try {
      // Create the new order item
      const orderItem = await this.orderItemModel.create<OrderItem>({
        name: orderItemDto.name,
        price: orderItemDto.price,
        quantity: orderItemDto.quantity,
        orderId: orderId
      } as OrderItemCreationAttributes, { transaction });

      // Update the order's total price
      const currentTotalPrice = order.totalPrice || 0;
      const newItemTotalPrice = orderItemDto.price * orderItemDto.quantity;
      await order.update(
        { totalPrice: currentTotalPrice + newItemTotalPrice }, 
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      // Return the created order item
      return orderItem;
    } catch (error) {
      // Rollback the transaction if anything goes wrong
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const deletedRowCount = await this.orderModel.destroy({ where: { id } });
    
    if (deletedRowCount === 0) {
      throw new NotFoundException('Order not found');
    }
  }
}
