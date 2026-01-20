import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/data.source';
import { RolesModule } from './roles/roles.module';
import { ClientModule } from './client/client.module';
import { MenuModule } from './menu/menu.module';
import { SideDishesModule } from './side-dishes/side-dishes.module';
import { DrinksModule } from './drinks/drinks.module';
import { SalesModule } from './sales/sales.module';
import { OrderModule } from './order/order.module';
import * as joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_NAME: joi.string().required(),
        HASH_SALT: joi.number().required(),
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRE: joi.string().required(),
      }),
    }),
    SequelizeModule.forRoot(sequelizeConfig),
    UsersModule,
    RolesModule,
    ClientModule,
    MenuModule,
    SideDishesModule,
    DrinksModule,
    SalesModule,
    OrderModule,
    ScheduleModule.forRoot(),
    AuthModule,
    StatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
