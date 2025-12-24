import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users', // Asegúrate de que el nombre de la tabla coincida con tu base de datos
  timestamps: true, // Si deseas que se registren las fechas de creación y actualización automáticamente
})
export default class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Se asume que el email es único
  })
  email: string;

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
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  user_role: string;
}
