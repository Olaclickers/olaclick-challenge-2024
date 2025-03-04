import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto, TokenDto } from './dto/create-auth.dto';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import AuthResponse, { IUser } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: CreateAuthDto): Promise<AuthResponse> {
    const user = await this.usersService.verifyUserCredentials(signInDto.email, signInDto.password);
    if (!user) {
      throw createCustomException('Usuario o contraseña incorrectos.', 401, 'Client');
    }
    const token = await this.signToken(user);
    return {
      access_token: token,
      user: await this.buildUserResponse(user),
    };
  }

  async signToken(user: IUser): Promise<string> {
    try {
      const payload = { ...user };
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      console.error('Error al firmar token:', error);
      throw createCustomException('Error interno al generar el token.', 500, 'Server');
    }
  }

  async validateToken(tokenDto: TokenDto): Promise<IUser | null> {
    const { token } = tokenDto;
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return await this.usersService.findById(payload.id);
    } catch (error) {
      throw createCustomException('El token del usuario no es válido o ya ha caducado.', 401, 'Client');
    }
  }

  async buildUserResponse(user: IUser) {
    return {
      id: user?.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      dni: user.dni,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      role_id: user.role_id,
      username: user.username,
      active: user.active,
    };
  }
}
