import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { OrderDetail } from './order-detail.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  detail: string;

  @Column({
    allowNull: false,
  })
  customer: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total: number;

  @Column({
    allowNull: false,
    defaultValue: 'iniciado',
  })
  status: string;

  @HasMany(() => OrderDetail)
  details: OrderDetail[];
}