import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import Role from './models/role.model';
import { roles } from './seed/data';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}
  async onModuleInit(): Promise<void> {
    await this.onInit();
  }
  private async onInit(): Promise<void> {
    await this.saveRoles();
  }
  private async saveRoles(): Promise<void> {
    const existingRoles = await this.roleModel.count();
    if (existingRoles === 0) {
      await this.roleModel.bulkCreate(roles);
    }
  }
  async findOne(id: string){
    const role =  this.roleModel.findOne({
      where:{id}
    })
    return role
  }
}
