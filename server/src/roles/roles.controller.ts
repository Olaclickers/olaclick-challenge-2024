import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import Role from './models/role.model';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Post()
  @ApiBody({ type: CreateRoleDto, description: 'Inserta los datos del Rol' })
  @ApiOperation({ summary: 'Registro de Rol' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({ status: 201, description: 'El Rol fue creado.' })
  @UseGuards(AuthGuard /* UserRolGuard */)
  async create(@Body() roleDto: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create(roleDto);
  }
  @Get()
  @ApiOperation({ summary: 'Obtener Los Roles' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  // @ApiPaginatedResponse(CreateRoleDto, 'Roles con paginado.')
  @UseGuards(AuthGuard /* UserRolGuard */)
  async findAll(/* @Query() pageOptionsDto: PageOptionsDto */) /* : Promise<PageDto<Role>> */ {
    return await this.rolesService.findAll(/* pageOptionsDto */);
  }
  @Get(':rol')
  @ApiOperation({ summary: 'Obtener un Rol' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiParam({ name: 'rol', example: 'CHW' })
  @ApiResponse({ status: 200, description: 'El Rol fue encontrado' })
  @UseGuards(AuthGuard /* UserRolGuard */)
  async findOne(@Param('rol') rol: any): Promise<Role> {
    return await this.rolesService.findOne(rol);
  }
}
