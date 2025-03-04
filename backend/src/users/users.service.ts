// src/users/users.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import User from './models/user.model';
import { Op } from 'sequelize';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { RolesService } from 'src/roles/roles.service';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { paginate } from 'src/common/pagination/paginate';
import { IResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly roleServices: RolesService,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { dni, email, username, password, role_id } = createUserDto;
    const existingDni = await this.userModel.findOne({ where: { dni } });
    if (existingDni) {
      throw createCustomException('El DNI ya está registrado.', 409, 'user');
    }
    const existingEmail = await this.userModel.findOne({ where: { email } });
    if (existingEmail) {
      throw createCustomException('El correo electrónico ya está registrado.', 409, 'user');
    }
    const existingUsername = await this.userModel.findOne({ where: { username } });
    if (existingUsername) {
      throw createCustomException('El nombre de usuario ya está registrado.', 409, 'user');
    }
    const role = await this.roleServices.findOne(role_id);
    if (!role) {
      throw createCustomException(`El role no existe.`, 404, 'user');
    }
    const saltRounds = parseInt(process.env.HASH_SALT as string, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ ...createUserDto, password: hashedPassword });
    return (await user.save()).toJSON();
  }

  // Obtener todos los usuarios
  async findAll(paginationDto: PaginationDto): Promise<Pagination<User>> {
    const { page = 1, limit = 10 } = paginationDto;

    const { rows: users, count: totalItems } = await this.userModel.findAndCountAll({
      include:['role'],
      offset: (page - 1) * limit,
      limit,
    });
    const _users = users.map((user) => user.toJSON());
    if (!_users.length) {
      throw createCustomException('Usuario no encontrado revice los cliterios de busqueda.', 404, 'Client');
    }

    return paginate(_users, totalItems, page, limit);
  }
   async findAllUSer(){
    return (await this.userModel.count())
   }

  // Obtener un usuario por DNI
  async findOne(dni: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { dni }, include:['role'], });
    if (!user) {
      throw createCustomException('Usuario no encontrado.', 404, 'User');
    }
    return user;
  }
  async findByDni(dni: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { dni } });
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findByPk(id);
    const _user = user?.toJSON();
    return _user;
  }

  // Actualizar un usuario
  async update(dni: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(dni); // Verificar si el usuario existe

    // Si hay cambios en la contraseña, la encriptamos
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update(updateUserDto);
    return user;
  }

  // Activar usuario
  async activate(dni: string): Promise<User> {
    const user = await this.findOne(dni);
    if (!user) {
      throw createCustomException('Usuario no encontrado', 404, 'user');
    }
    user.active = !user.active;
    await user.save();
    return user;
  }

  // Eliminar un usuario
  async remove(dni: string): Promise<IResponse> {
    const user = await this.findOne(dni); // Verificar si el usuario existe
    await user.destroy();
    return {
      message: 'El usuario fue eliminado exitosamente',
      code: 'OK_USER_DELETE',
    };
  }

  async verifyUserCredentials(email: string, password: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({
      where: { email },include:['role']
    });
    const _foundUser = foundUser?.toJSON();
    if (!_foundUser) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, _foundUser.password);
    if (!isPasswordValid) {
      return null;
    }
    delete _foundUser.password;
    return _foundUser;
  }
}
