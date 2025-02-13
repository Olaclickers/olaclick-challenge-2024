import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { CustomUnauthorizedException } from "../custom-unauthorized";
import { I18nContext, I18nService } from "nestjs-i18n";
import { permissionsRol, Roles } from "src/config/role/roles";

@Injectable()
export class UserRolGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService

  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const method = context.switchToHttp().getRequest().method;
    const endpoint = context.switchToHttp().getRequest().route.path
    const rolesList = await Roles;
    const permissionsRolList = permissionsRol;
    const i18n = I18nContext.current();


    const userToken = await this.jwtService.decode(token as string);

    const { user_role } = userToken;
    const existsRole = this.roleValidate(userToken, rolesList);

    if (!existsRole) {
      throw new CustomUnauthorizedException(method, endpoint, this.i18n.t('lang.AUTH.INVALID_ROLE', { lang: i18n!.lang }));
    }
    console.log(1000, endpoint, method, user_role, permissionsRol);
    
    const permissionsRolValidate = this.validateRolesWhitEndpoint(
      endpoint,
      method,
      user_role,
      permissionsRolList
    );


    if (!permissionsRolValidate) {
      console.log(2000, method,endpoint);
      
      throw new CustomUnauthorizedException(
        method,
        endpoint,
        this.i18n.t('lang.AUTH.INVALID_PERMISSIONS', { lang: i18n!.lang })
      );
    }

    return existsRole;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private roleValidate(userRole, roles) {
    const { user_role } = userRole;
    return roles.some((item) => item.rol === user_role);
  }

  private validateRolesWhitEndpoint = (endpoint, method, rol, data) => {
console.log(500, data[0].endpoint);

    const endpointData = data.find((item) => item.endpoint === endpoint);
    console.log(3000, endpointData);
    

    if (!endpointData) return false;

    const methodData = endpointData.methods.find(
      (methodInfo) => methodInfo.method === method
    );
    console.log(4000, methodData);
    
    if (!methodData) return false;

    return methodData.allowed_roles.includes(rol);
  };
}
