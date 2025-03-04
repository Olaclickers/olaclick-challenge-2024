import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UsersService } from 'src/users/users.service';
import Client from './models/client.model';
import { InjectModel } from '@nestjs/sequelize';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { paginate } from 'src/common/pagination/paginate';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
    private readonly usersService: UsersService,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { dni, email } = createClientDto;
    const existingDni = await this.clientModel.findOne({
      where: { dni },
    });
    if (existingDni) {
      throw createCustomException('El DNI ya está registrado.', 409, 'user');
    }
    const existingEmail = await this.clientModel.findOne({ where: { email } });
    if (existingEmail) {
      throw createCustomException('El correo electrónico ya está registrado.', 409, 'user');
    }
    const client = await this.clientModel.create(createClientDto as Partial<Client>);
    return client.toJSON();
  }
  // Obtener un usuario por DNI
  async findOne(dni: string): Promise<Client> {
    const client = await this.clientModel.findOne({ where: { dni } });
    if (!client) {
      throw createCustomException('Cliente no encontrado.', 404, 'Client');
    }
    return client;
  }

  async findById(dni: string): Promise<Client | null> {
    return await this.clientModel.findOne({ where: { dni } });
  }

  async findAll(paginationDto: PaginationDto): Promise<Pagination<Client>> {
    const { page = 1, limit = 10 } = paginationDto;

    const { rows: clients, count: totalItems } = await this.clientModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    });
    const _clients = clients.map((client) => client.toJSON());
    if (!_clients.length) {
      throw createCustomException('Lista de cliente no encontrada revice los cliterios de busqueda.', 404, 'Client');
    }

    return paginate(_clients, totalItems, page, limit);
  }

  async remove(dni: string) {
    const client = await this.findOne(dni);
    await client.destroy();
    return {
      message: 'El cliente fue eliminado exitosamente',
      code: 'OK_CLIENT_DELETE',
    };
  }
}
