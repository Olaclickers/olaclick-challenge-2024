import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.model';


@Table({ tableName: 'order_details' })
export class OrderDetail extends Model<OrderDetail> {
  @Column({
    allowNull: false,
  })
  item: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  unitCost: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalCost: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;
}