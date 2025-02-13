import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Role from './models/role.model';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    UsersModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
