import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import Client from './models/client.model';
import { Pagination } from 'src/common/pagination/pagination.interface';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'El cliente ha sido creado exitosamente.', type: Client })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta. Errores de validación.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de clientes' })
  @ApiQuery({ name: 'page', required: false, description: 'El número de página para la paginación.', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'El límite de elementos por página.', type: Number })
  @ApiResponse({ status: 200, description: 'La lista de clientes.', type: [Client] })
  findAll(@Query() paginationDto: PaginationDto): Promise<Pagination<Client>> {
    return this.clientService.findAll(paginationDto);
  }

  @Delete(':dni')
  @ApiOperation({ summary: 'Eliminar un cliente por DNI' })
  @ApiParam({ name: 'dni', description: 'El DNI del cliente a eliminar.', type: String })
  @ApiResponse({ status: 200, description: 'El cliente ha sido eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  remove(@Param('dni') dni: string) {
    return this.clientService.remove(dni);
  }
}
