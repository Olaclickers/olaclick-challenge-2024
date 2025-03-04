import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import BaseModel from 'src/config/base.model';
import Order from 'src/order/models/order.model';

@Table
export default class SideDishes extends BaseModel {
//   @Column({
//     primaryKey: true,
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4,
//   })
//   id: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  side_dishes: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  // Relación uno a muchos con Order, un contorno puede estar en muchas órdenes
  @HasMany(() => Order)
  orders: Order[];
}
