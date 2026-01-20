// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './models/user.model';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.', type: User })
  @ApiResponse({ status: 400, description: 'Petición incorrecta.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página para paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de registros por página' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida correctamente.', type: [User] })
  @ApiResponse({ status: 400, description: 'Petición incorrecta.' })
  async findAll(@Query() paginationDto: PaginationDto): Promise<User[] | any> {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':dni')
  @ApiOperation({ summary: 'Obtener un usuario por DNI' })
  @ApiParam({ name: 'dni', type: String, description: 'DNI del usuario a buscar' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async findOne(@Param('dni') dni: string): Promise<User> {
    return this.usersService.findOne(dni);
  }

  @Put(':dni')
  @ApiOperation({ summary: 'Actualizar un usuario por DNI' })
  @ApiParam({ name: 'dni', type: String, description: 'DNI del usuario a actualizar' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.', type: User })
  @ApiResponse({ status: 400, description: 'Petición incorrecta.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async update(@Param('dni') dni: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(dni, updateUserDto);
  }

  @Patch(':dni')
  @ApiOperation({ summary: 'Activar o desactivar un usuario por DNI' })
  @ApiParam({ name: 'dni', type: String, description: 'DNI del usuario a activar/desactivar' })
  @ApiResponse({ status: 200, description: 'Usuario activado/desactivado correctamente.', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async activate(@Param('dni') dni: string): Promise<User> {
    return this.usersService.activate(dni);
  }

  @Delete(':dni')
  @ApiOperation({ summary: 'Eliminar un usuario por DNI' })
  @ApiParam({ name: 'dni', type: String, description: 'DNI del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async remove(@Param('dni') dni: string): Promise<IResponse> {
    return this.usersService.remove(dni);
  }
}
