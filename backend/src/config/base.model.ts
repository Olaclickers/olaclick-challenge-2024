import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({ timestamps: true })
export abstract class BaseModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  declare updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE, allowNull: true })
  declare deletedAt: Date;
}

export default BaseModel;  // Asegúrate de exportar por defecto
