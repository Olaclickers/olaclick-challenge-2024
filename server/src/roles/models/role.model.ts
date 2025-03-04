import { Table, Column, Model, DataType, PrimaryKey, Default, DeletedAt } from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { ROLES_TYPE } from '../types/role.type.enum';

@Table({ tableName: 'roles', timestamps: false })
export default class Role extends Model<Role> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'rol',
  })
  rol: string;

  @Column({
    type: DataType.ENUM(...Object.values(ROLES_TYPE)), // Asegura que solo acepte los valores del enum
    allowNull: false,
    field: 'role_type',
  })
  role_type: ROLES_TYPE;

  @DeletedAt
  @Exclude()
  @Column({
    type: DataType.DATE,
    field: 'deleted_at',
  })
  deleted_at: Date;
}
