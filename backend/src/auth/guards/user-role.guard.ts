import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { permissionsRol, getRoles } from 'src/config/role/roles';

@Injectable()
export class UserRolGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw createCustomException('Acceso denegado: Token no encontrado.', 401, 'Auth');
    }

    const decodedToken = this.jwtService.decode(token);
    const user_role = decodedToken?.role?.role;

    if (!user_role) {
      throw createCustomException('Acceso denegado: Token inválido o sin rol.', 401, 'Auth');
    }

    const rolesList = await getRoles();
    const userRole = decodedToken?.role?.role;

    if (!this.isValidRole(userRole, rolesList)) {
      throw createCustomException(`El rol '${userRole}' no está autorizado en el sistema.`, 403, 'Auth');
    }

    const { method, route } = request;
    if (!this.hasPermission(userRole, route.path, method)) {
      throw createCustomException('No tienes los permisos necesarios para acceder a este recurso.', 403, 'Auth');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  private isValidRole(userRole: string, roles: { rol: string }[]): boolean {
    return roles.some((role) => role.rol === userRole);
  }

  private hasPermission(userRole: string, endpoint: string, method: string): boolean {
    const endpointConfig = permissionsRol.find((item) => item.endpoint === endpoint);
    if (!endpointConfig) return false;

    const methodConfig = endpointConfig.methods.find((m) => m.method === method);
    if (!methodConfig) return false;

    return methodConfig.allowed_roles.includes(userRole);
  }
}
