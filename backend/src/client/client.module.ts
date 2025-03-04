import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Client from './models/client.model';
import { UsersModule } from 'src/users/users.module';

@Module({imports: [
  SequelizeModule.forFeature([Client]),
  UsersModule
],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
