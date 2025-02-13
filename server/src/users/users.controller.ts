import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import User from './models/user.model';
import AuthResponse from 'src/auth/interfaces/auth.interfaces';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRolGuard } from 'src/auth/guards/userRol.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto, description: 'Inserta los datos del usuario.' })
  @ApiOperation({ summary: 'Registro de Usuario' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({ status: 201, description: 'El usuario fue creado.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }
  @Patch('update-role')
  @ApiOperation({ summary: 'Actualizar el role del usuario' })
  @ApiBody({ type: UpdateUserRole, description: 'Modifica el role del usuario.' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Actualización del usuario completada.' })
  @UseGuards(AuthGuard, UserRolGuard)
  async updateRole(@Request() req, @Body() updateUserRole: UpdateUserRole): Promise<AuthResponse> {
    const userId = req.user.id;
    return await this.usersService.updateRole(userId, updateUserRole);
  }
}
