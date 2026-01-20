import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import BaseModel from 'src/config/base.model';
import Order from 'src/order/models/order.model';

@Table
export default class Sales extends BaseModel {

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  order_id: string;

  // Relación con Order (muchos a uno)
  @BelongsTo(() => Order)
  order: Order;
}
