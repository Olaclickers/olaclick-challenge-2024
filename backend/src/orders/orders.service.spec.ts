import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from './order-items/entities/order-item.entity';
import { Sequelize } from 'sequelize-typescript';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrderModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(), 
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockOrderItemModel = {
    bulkCreate: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };

  const mockSequelize = {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order),
          useValue: mockOrderModel,
        },
        {
          provide: getModelToken(OrderItem),
          useValue: mockOrderItemModel,
        },
        {
          provide: Sequelize,
          useValue: mockSequelize,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  beforeEach(() => {
    // Reset all mocks before each test
    mockOrderModel.findByPk.mockReset();
    mockOrderModel.update.mockReset();
    mockOrderItemModel.create.mockReset();
  });

  // Helper function to create a mock Sequelize model instance
  function createMockModelInstance(data) {
    return {
      ...data,
      update: jest.fn().mockImplementation(function(updateData) {
        return Promise.resolve({ ...this, ...updateData });
      }),
      save: jest.fn().mockImplementation(function() {
        return Promise.resolve(this);
      }),
      reload: jest.fn().mockImplementation(function() {
        return Promise.resolve(this);
      }),
      $add: jest.fn(),
      $set: jest.fn(),
      $get: jest.fn(),
    };
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order successfully', async () => {
    const createOrderDto = {
      totalPrice: 100,
      customerName: 'Test Customer',
      orderItems: [
        { name: 'Item 1', price: 50, quantity: 1 },
        { name: 'Item 2', price: 50, quantity: 1 },
      ],
    };

    const mockCreatedOrder = {
      id: 1,
      totalPrice: 100,
      customerName: 'Test Customer',
      status: 'initiated',
      orderItems: [
        { id: 1, name: 'Item 1', price: 50, quantity: 1, orderId: 1 },
        { id: 2, name: 'Item 2', price: 50, quantity: 1, orderId: 1 },
      ]
    };

    // Update mocking to match Sequelize-style methods
    mockOrderModel.create.mockResolvedValue(mockCreatedOrder);
    mockOrderModel.findByPk.mockResolvedValue(mockCreatedOrder);
    mockOrderItemModel.bulkCreate.mockResolvedValue(mockCreatedOrder.orderItems);

    // Mock the transaction
    mockSequelize.transaction.mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
      async run(callback) {
        return callback();
      },
    });

    const result = await service.create(createOrderDto);

    // Verify order creation
    expect(mockOrderModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        totalPrice: 100,
        customerName: 'Test Customer',
        status: 'initiated',
      }),
      expect.any(Object)
    );

    // Verify order items creation
    expect(mockOrderItemModel.bulkCreate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Item 1', price: 50, quantity: 1 }),
        expect.objectContaining({ name: 'Item 2', price: 50, quantity: 1 }),
      ]),
      expect.any(Object)
    );

    // Verify result
    expect(result).toEqual(mockCreatedOrder);
  });

  it('should handle order creation failure', async () => {
    const createOrderDto = {
      totalPrice: 100,
      customerName: 'Test Customer',
      orderItems: [],
    };

    // Reset and mock all relevant methods to simulate failure
    mockOrderModel.create.mockReset();
    mockOrderItemModel.bulkCreate.mockReset();
    mockSequelize.transaction.mockReset();

    // Mock transaction to simulate a failure during order creation
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };

    const mockError = new Error('Simulated database error');
    mockSequelize.transaction.mockResolvedValue(mockTransaction);
    mockOrderModel.create.mockRejectedValue(mockError);

    // Expect the method to throw an error with the specific message
    await expect(service.create(createOrderDto)).rejects.toThrow(
      `Database transaction failed: ${mockError.message}`
    );

    // Verify that rollback was called
    expect(mockTransaction.rollback).toHaveBeenCalled();
  });

  it('should update an order successfully', async () => {
    const orderId = 1;
    const updateOrderDto = {
      customerName: 'Updated Customer',
      totalPrice: 150,
    };

    // Create mock instances for existing and updated orders
    const mockExistingOrder = createMockModelInstance({
      id: orderId,
      customerName: 'Original Customer',
      totalPrice: 100,
      status: 'initiated',
      orderItems: [], // Empty orderItems
    });

    const mockUpdatedOrder = createMockModelInstance({
      ...mockExistingOrder,
      customerName: 'Updated Customer',
      totalPrice: 150,
    });

    // Create a mock transaction
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };

    // Mock the transaction creation
    mockSequelize.transaction.mockResolvedValue(mockTransaction);

    // Mock findByPk to handle different scenarios
    mockOrderModel.findByPk
      // First call (outside transaction) to check order existence
      .mockResolvedValueOnce(mockExistingOrder)
      // Second call (within transaction) to get order with items
      .mockResolvedValueOnce({
        ...mockExistingOrder,
        update: jest.fn().mockImplementation(function(updateData, options) {
          // Verify transaction is passed
          expect(options.transaction).toBe(mockTransaction);
          
          // Merge update data
          return Promise.resolve({
            ...this,
            ...updateData,
          });
        }),
        include: jest.fn(), // Simulate include method
      })
      // Third call after update to return updated order
      .mockResolvedValueOnce(mockUpdatedOrder);

    // Mock findOne to return the updated order
    mockOrderModel.findOne = jest.fn().mockResolvedValue(mockUpdatedOrder);

    const result = await service.update(orderId, updateOrderDto);

    // Verify findByPk was called three times
    expect(mockOrderModel.findByPk).toHaveBeenCalledTimes(3);

    // Verify transaction was committed
    expect(mockTransaction.commit).toHaveBeenCalled();

    // Verify result matches the updated order
    expect(result).toEqual(mockUpdatedOrder);
  });

  it('should change order status successfully', async () => {
    const orderId = 1;
    const newStatus = 'sent';

    const mockOrder = createMockModelInstance({
      id: orderId,
      customerName: 'Test Customer',
      totalPrice: 100,
      status: 'initiated',
    });

    const mockUpdatedOrder = createMockModelInstance({
      ...mockOrder,
      status: newStatus,
    });

    mockOrderModel.findByPk
      .mockResolvedValueOnce(mockOrder)
      .mockResolvedValueOnce(mockUpdatedOrder);

    mockOrderModel.update.mockResolvedValue([1, [mockUpdatedOrder]]);

    const result = await service.updateOrderStatus(orderId, newStatus);

    expect(mockOrderModel.findByPk).toHaveBeenCalledTimes(2);
    expect(mockOrderModel.update).toHaveBeenCalledWith(
      { status: newStatus },
      { where: { id: orderId } }
    );
    expect(result.status).toEqual(newStatus);
  });

  it('should add an order item to an existing order', async () => {
    const orderId = 1;
    const newOrderItem = {
      name: 'New Item',
      price: 25,
      quantity: 2,
    };

    const mockOrder = createMockModelInstance({
      id: orderId,
      customerName: 'Test Customer',
      totalPrice: 100,
      status: 'initiated',
      orderItems: [],
    });

    const mockCreatedOrderItem = {
      id: 3,
      name: 'New Item',
      price: 25,
      quantity: 2,
      orderId: orderId,
    };

    // Create a mock transaction
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };

    // Mock the transaction creation
    mockSequelize.transaction.mockResolvedValue(mockTransaction);

    // Mock findByPk to return the order
    mockOrderModel.findByPk.mockResolvedValue(mockOrder);

    // Mock create to return the new order item
    mockOrderItemModel.create.mockImplementation((data, options) => {
      // Verify the transaction is passed
      expect(options.transaction).toBe(mockTransaction);
      return Promise.resolve(mockCreatedOrderItem);
    });

    // Mock order update to work with transaction
    mockOrder.update.mockImplementation((data, options) => {
      // Verify the transaction is passed
      expect(options.transaction).toBe(mockTransaction);
      return Promise.resolve({ ...mockOrder, ...data });
    });

    const result = await service.addOrderItem(orderId, newOrderItem);

    // Verify findByPk was called
    expect(mockOrderModel.findByPk).toHaveBeenCalledWith(orderId);

    // Verify create was called with correct data
    expect(mockOrderItemModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...newOrderItem,
        orderId: orderId,
      }),
      expect.any(Object)
    );

    // Verify transaction was committed
    expect(mockTransaction.commit).toHaveBeenCalled();

    // Verify result matches created order item
    expect(result).toEqual(mockCreatedOrderItem);
  });

  it('should throw NotFoundException when updating a non-existent order', async () => {
    const orderId = 999;
    const updateOrderDto = {
      customerName: 'Updated Customer',
    };

    mockOrderModel.findByPk.mockResolvedValue(null);

    await expect(service.update(orderId, updateOrderDto)).rejects.toThrow('Order not found');
  });
});
