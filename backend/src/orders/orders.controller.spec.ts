import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

const mockOrderRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

// Mock Order representing a restaurant order with detailed structure
const mockOrder = {
  id: 2,
  customerName: 'José José',
  details: 'Ensalada cesar + coca cola',
  status: 'sent' as const,
  totalPrice: 140.00,
  // Add Sequelize model methods
  $add: jest.fn(),
  $set: jest.fn(),
  $get: jest.fn(),
  $count: jest.fn(),
  save: jest.fn(),
  reload: jest.fn(),
  update: jest.fn(),
} as unknown as Order;

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            updateOrderStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return only non-delivered orders', async () => {
      const mockOrders = [
        { 
          id: 1, 
          customerName: 'Juan Perez', 
          status: 'initiated', 
          totalPrice: 120.00,
          $add: jest.fn(),
          $set: jest.fn(),
          $get: jest.fn(),
          $count: jest.fn(),
          save: jest.fn(),
          reload: jest.fn(),
          update: jest.fn(),
        } as unknown as Order,
        mockOrder,
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockOrders);

      const result = await controller.findAll();
      expect(result).toEqual(mockOrders);
      expect(result.every(order => order.status !== 'delivered')).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a specific order by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockOrder);

      const result = await controller.findOne(2);
      expect(result).toEqual(mockOrder);
      expect(result.id).toBe(2);
      expect(result.customerName).toBe('José José');
      expect(result.totalPrice).toBe(140.00);
    });
  });

  describe('create', () => {
    it('should create a new order with default initiated status', async () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'Andrés',
        totalPrice: 90.00,
        details: 'Lomo saltado + Chicha morada',
        status: 'initiated',
      };

      const expectedOrder = {
        ...createOrderDto,
        id: expect.any(Number),
        $add: expect.any(Function),
        $set: expect.any(Function),
        $get: expect.any(Function),
        $count: expect.any(Function),
        save: expect.any(Function),
        reload: expect.any(Function),
        update: expect.any(Function),
      } as unknown as Order;

      jest.spyOn(service, 'create').mockResolvedValue(expectedOrder);

      const result = await controller.create(createOrderDto);
      expect(result).toMatchObject(expectedOrder);
      expect(result.status).toBe('initiated');
    });

    it('should create a new order with default initiated status and an order item', async () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'Andrés',
        totalPrice: 90.00,
        details: 'Lomo saltado + Chicha morada',
        status: 'initiated',
        orderItems: [
          {
            name: 'Lomo Saltado',
            price: 50.00,
            quantity: 1,
          }
        ],
      };

      const expectedOrder = {
        ...createOrderDto,
        id: expect.any(Number),
        $add: expect.any(Function),
        $set: expect.any(Function),
        $get: expect.any(Function),
        $count: expect.any(Function),
        save: expect.any(Function),
        reload: expect.any(Function),
        update: expect.any(Function),
        orderItems: [
          {
            id: expect.any(Number),
            name: 'Lomo Saltado',
            price: 50.00,
            quantity: 1,
          }
        ],
      } as unknown as Order;

      jest.spyOn(service, 'create').mockResolvedValue(expectedOrder);

      const result = await controller.create(createOrderDto);
      expect(result).toMatchObject(expectedOrder);
      expect(result.status).toBe('initiated');
      expect(result.orderItems).toHaveLength(1);
      expect(result.orderItems[0].name).toBe('Lomo Saltado');
      expect(result.orderItems[0].price).toBe(50.00);
      expect(result.orderItems[0].quantity).toBe(1);
    });

    it('should handle creating an order with minimal required fields', async () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'Maria',
        totalPrice: 50.00,
        details: '',
      };

      const expectedOrder = {
        ...createOrderDto,
        status: 'initiated',
        id: expect.any(Number),
        $add: expect.any(Function),
        $set: expect.any(Function),
        $get: expect.any(Function),
        $count: expect.any(Function),
        save: expect.any(Function),
        reload: expect.any(Function),
        update: expect.any(Function),
      } as unknown as Order;

      jest.spyOn(service, 'create').mockResolvedValue(expectedOrder);

      const result = await controller.create(createOrderDto);
      expect(result).toMatchObject(expectedOrder);
      expect(result.status).toBe('initiated');
      expect(result.customerName).toBe('Maria');
      expect(result.totalPrice).toBe(50.00);
    });

    it('should throw an error when creating an order with invalid data', async () => {
      const invalidOrderDto = {
        customerName: '', // Empty customer name
        totalPrice: -10, // Negative price
        details: 'Some details',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Validation failed'));

      await expect(controller.create(invalidOrderDto as CreateOrderDto)).rejects.toThrow('Validation failed');
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status', async () => {
      const createModelInstance = (overrides: Partial<Order> = {}) => {
        return {
          id: 2,
          customerName: 'José José',
          details: 'Ensalada cesar + coca cola',
          status: 'sent' as const,
          totalPrice: 140.00,
          createdAt: new Date(),
          updatedAt: new Date(),
          save: jest.fn().mockImplementation(function(this: any) {
            this.status = 'delivered';
            return this;
          }),
          $add: jest.fn(),
          $set: jest.fn(),
          $get: jest.fn(),
          $count: jest.fn(),
          reload: jest.fn(),
          update: jest.fn(),
          toJSON: jest.fn().mockReturnValue({
            id: 2,
            customerName: 'José José',
            details: 'Ensalada cesar + coca cola',
            status: 'delivered',
            totalPrice: 140.00,
          }),
          ...overrides,
        } as unknown as Order;
      };

      const originalOrder = createModelInstance();
      const updatedOrder = createModelInstance({ 
        status: 'delivered' as const 
      });

      jest.spyOn(service, 'findOne').mockResolvedValue(originalOrder);
      jest.spyOn(service, 'updateOrderStatus').mockResolvedValue(updatedOrder);

      const result = await controller.updateStatus(2, 'delivered');
      expect(result.status).toBe('delivered');
    });
  });
});
