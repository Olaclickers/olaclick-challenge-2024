import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize/types'; // Importar el tipo Dialect
import User from 'src/users/models/user.model';

ConfigModule.forRoot();
const configService = new ConfigService();

export const sequelizeConfig = {
  dialect: 'postgres' as Dialect,
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  models: [__dirname + '/../**/*.model{.ts,.js}'],
  autoLoadModels: true, // Carga automática de modelos
  synchronize: true, // Sincroniza los modelos con la base de datos
  logging: false, // Deshabilita el registro de SQL
  dialectOptions: process.env.DB_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  define: {
    freezeTableName: true, // Mantiene los nombres de las tablas tal como están (sin pluralizar)
    underscored: true, // Usa snake_case en lugar de camelCase
  },
};

export const AppSequelizeModule = SequelizeModule.forRoot(sequelizeConfig);
