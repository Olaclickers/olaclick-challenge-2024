import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { OrderItem } from '../order-items/entities/order-item.entity';

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class Order extends Model<Order, OrderCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customerName: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.ENUM('initiated', 'sent', 'delivered'),
    allowNull: false,
    defaultValue: 'initiated',
  })
  status: 'initiated' | 'sent' | 'delivered';

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  details?: string;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}

export interface OrderCreationAttributes {
  customerName: string;
  totalPrice: number;
  status?: 'initiated' | 'sent' | 'delivered';
  details?: string;
  orderItems?: OrderItem[];
}
