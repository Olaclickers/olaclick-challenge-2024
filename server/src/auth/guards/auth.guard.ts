import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomUnauthorizedException } from '../custom-unauthorized';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly i18n: I18nService, // Inyectamos el servicio de i18n
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const method = context.switchToHttp().getRequest().method;
    const endpoint = context.switchToHttp().getRequest().url;

    // Verificamos si i18n está definido
    const lang =
      context.switchToHttp().getRequest().headers['accept-language'] || 'en'; // Usamos un valor por defecto si no hay lenguaje

    if (!token) {
      throw new CustomUnauthorizedException(
        method,
        endpoint,
        await this.i18n.t('lang.AUTH.INVALID', { lang }), // Usamos `this.i18n` directamente
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new CustomUnauthorizedException(
        method,
        endpoint,
        await this.i18n.t('lang.AUTH.INVALID', { lang }), // Usamos `this.i18n` directamente
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
