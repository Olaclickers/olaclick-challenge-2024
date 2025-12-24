import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import User from './models/user.model';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/sequelize';
import { CustomHttpExceptionValidate } from 'src/config/exeptions/CustomHttpException';
import AuthResponse from 'src/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly i18n: I18nService,
    @Inject(forwardRef(() => AuthService)) private readonly authServices: AuthService,
  ) {}
  async create(userDto: CreateUserDto): Promise<User> {
    const i18n = I18nContext.current();
    const saltRounds = parseInt(process.env.HASH_SALT as string);
    const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);
    const { email } = userDto;
    const _user = await this.userModel.findOne({ where: { email } });
    if (_user) {
      const error = this.i18n.t('lang.USERS.EMAIL_EXISTS', { lang: i18n?.lang, args: { email: _user.email } });
      throw new CustomHttpExceptionValidate('POST', '/users', error, 'email', 409);
    }
    const user = await this.userModel.create({
      ...userDto,
      password: hashedPassword,
    } as User);
    return user.toJSON();
  }

  async updateRole(userId: string, updateUserRole: UpdateUserRole): Promise<AuthResponse> {
    const i18n = I18nContext.current();
    const user = await this.findById(userId); // Recupera el usuario

    if (!user) {
      const error = i18n!.t('lang.USERS.NOT_FOUND', { lang: i18n!.lang });
      throw new CustomHttpExceptionValidate('PATCH', '/users/update-role/:id', error, 'id', 404);
    }

    // Actualiza el campo `user_role` del usuario existente
    user.user_role = updateUserRole.user_role;
    await user.save(); // Guarda el usuario actualizado

    // Si deseas retornar un nuevo token, crea el payload y firma el token
    const payload = { id: user.id, email: user.email, user_role: user.user_role };
    const token = await this.authServices.signToken(payload);
    const authResponse = await this.authServices.validateToken({ token });

    return {
      access_token: token,
      user: authResponse.user,
    };
  }

  async findById(id: string, deleted: boolean = false): Promise<User | any> {
    const user = await this.userModel.findOne({
      where: { id },
      paranoid: !deleted, // Configura la opción para omitir los registros eliminados si 'deleted' es false
    });
    return user;
  }

  async existEmailPassword(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email }, attributes: ['id', 'email', 'first_name', 'last_name', 'user_role', 'password'] });
    if (!user) {
      return null;
    }
    const comparate = await this.comparePasswords(user.password, password);
    if (!comparate) {
      return null;
    }
    return user;
  }

  private async comparePasswords(userPassword: string, currentPassword: string) {
    return await bcrypt.compare(currentPassword, userPassword);
  }
}
