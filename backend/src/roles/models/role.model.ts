import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import BaseModel from 'src/config/base.model';
import User from 'src/users/models/user.model';

@Table
export default class Role extends BaseModel {
  @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    })
  role: string;

  // Relación uno a muchos con User, un rol puede tener muchos usuarios
  @HasMany(() => User)
  users: User[];
}
