import { Column, Table, HasMany, DataType } from 'sequelize-typescript';
import BaseModel from 'src/config/base.model';
import Order from 'src/order/models/order.model';

@Table({ paranoid: true })
export default class Client extends BaseModel {
  @Column({ primaryKey: true, type: DataType.STRING, allowNull: false, unique: true })
  declare dni: string; // ✅ Usar `declare` en lugar de definir una propiedad

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare first_name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare last_name: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  declare phone: string;

  @Column({ type: DataType.STRING(200), allowNull: false, unique: true })
  declare email: string;

  @HasMany(() => Order)
  declare orders: Order[];
}
