import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import Order from './order.model';

@Table({ tableName: 'order_items', timestamps: false })
export default class OrderItem extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  descripcion: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  cantidad: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  costoUnitario: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  costoTotal: number;
}

