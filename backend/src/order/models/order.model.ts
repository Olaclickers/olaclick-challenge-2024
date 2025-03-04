import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import BaseModel from 'src/config/base.model';
import User from 'src/users/models/user.model';
import Menu from 'src/menu/models/menu.model';
import Client from 'src/client/models/client.model';
import SideDishes from 'src/side-dishes/models/side-dish.model';
import Drinks from 'src/drinks/models/drink.model';

@Table({ paranoid: true })
export default class Order extends BaseModel {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_dni: string;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  client_dni: string;

  @ForeignKey(() => Menu)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  menu_id: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  quantity_menu: number;

  @ForeignKey(() => SideDishes)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  side_dishes_id: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  quantity_side_dishes: number;

  @ForeignKey(() => Drinks)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  drinks_id: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  quantity_drinks: number;

  @Column({
    type: DataType.ENUM('iniciado', 'enviado', 'entregado', 'cancelado', 'facturado'),
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0,
  })
  total: number;

  // Relación con User (muchos a uno)
  @BelongsTo(() => User)
  user: User;

  // Relación con Client (muchos a uno)
  @BelongsTo(() => Client)
  client: Client;

  // Relación con Menu (muchos a uno)
  @BelongsTo(() => Menu)
  menu: Menu;

  // Relación con SideDishes (muchos a uno)
  @BelongsTo(() => SideDishes)
  sideDishes: SideDishes;

  // Relación con Drinks (muchos a uno)
  @BelongsTo(() => Drinks)
  drinks: Drinks;
}
