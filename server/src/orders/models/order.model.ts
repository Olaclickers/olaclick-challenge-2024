import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import  OrderItem  from './orderItem.model';

@Table({ tableName: 'orders', timestamps: true })
export default class Order extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  detalle: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cliente: string;

  @Column({ type: DataType.ENUM('iniciado', 'enviado', 'entregado'), allowNull: false })
  estado: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  total: number;

  @HasMany(() => OrderItem)
  items: OrderItem[];
}
