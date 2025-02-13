import { Injectable, OnModuleInit } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CustomHttpExceptionValidate } from 'src/config/exeptions/CustomHttpException';
import Role from './models/role.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { rolesSeedData } from './seeds/data';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectModel(Role) private readonly roleModel: typeof Role,
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  async onModuleInit() {
    console.log('insertRoles se está ejecutando...');
    await this.insertRoles();
  }

  async insertRoles(): Promise<void> {
    const roles = await this.roleModel.findAll()
    if(!roles.length){
      await Role.bulkCreate(rolesSeedData as any);
    }
  }

  async create(roleDto: CreateRoleDto): Promise<Role> {
    const { rol, role_type } = roleDto;
    await this.validateRol(rol, 'POST', '/roles');
    const role = await this.roleModel.create({
      rol,
    } as Role);
    return role;
  }

  private async validateRol(rol: string, method: string, path: string): Promise<void> {
    const i18n = I18nContext.current();
    const role = await this.roleModel.findOne({
      where: { rol },
      attributes: ['rol', 'role_type'],
    });
    if (role) {
      const error = this.i18n.t('lang.ROL.DUPLICATE', { lang: i18n!.lang, args: { rol } });
      throw new CustomHttpExceptionValidate(method, path, error, 'rol', 409);
    }
  }

  async findAll(/* pageOptionsDto: PageOptionsDto */) /* : Promise<PageDto<Role>> */ {
    const data = await this.roleModel.findAll({
      // skip: pageOptionsDto.skip,
      // take: pageOptionsDto.limit,
      attributes: ['rol', 'role_type'],
    });
    if (!data.length) {
      const i18n = I18nContext.current();
      const error = this.i18n.t('lang.ROL.NO_MATCHES', { lang: i18n!.lang });
      throw new CustomHttpExceptionValidate('GET', '/roles', error, 'roles', 404);
    }
    return data;
  }

  async findOne(rol: string): Promise<Role> {
    return await this.getValidateRolId(rol, 'GET', '/roles/:rol');
  }
  async getValidateRolId(rol: string, method: string, path: string, is_delete = false): Promise<Role> {
    const i18n = I18nContext.current();
    if (!rol.trim()) {
      const error = this.i18n.t('lang.DTO.NOT_EMPTY', { args: { property: 'rol' } });
      throw new CustomHttpExceptionValidate(method, path, error, 'rol');
    }
    if (rol.length > 100) {
      const error = this.i18n.t('lang.DTO.MAX_LENGTH', { args: { property: 'rol', max: 100 } });
      throw new CustomHttpExceptionValidate(method, path, error, 'rol');
    }
    const role = await this.roleModel.findOne({
      where: { rol },
      attributes: ['rol', 'role_type'],
    });
    if (!role) {
      let error = this.i18n.t('lang.ROL.NOT_EXIST', { lang: i18n!.lang });
      let code = 404;
      if (is_delete) {
        error = this.i18n.t('lang.ROL.NOT_EXIST_DELETE', { lang: i18n!.lang });
        code = 409;
      }
      throw new CustomHttpExceptionValidate(method, path, error, 'rol', code);
    }
    if (is_delete && rol === 'CHW') {
      const error = this.i18n.t('lang.ROL.PROTECTED_ROLE', { args: { rol: rol } });
      throw new CustomHttpExceptionValidate(method, path, error, 'rol');
    }
    return role;
  }
}
