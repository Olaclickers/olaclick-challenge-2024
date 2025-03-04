import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { BaseModel } from 'src/config/base.model';
import Role from 'src/roles/models/role.model';

@Table({ paranoid: true })
export default class User extends BaseModel {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  dni: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  // Relación muchos a uno con Role, un usuario pertenece a un rol
  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: true, // Rol obligatorio
  })
  role_id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  active: boolean;

  // Relación de pertenencia (muchos a uno)
  @BelongsTo(() => Role)
  role: Role;
}
