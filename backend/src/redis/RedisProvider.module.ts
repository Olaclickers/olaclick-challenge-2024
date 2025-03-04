import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: (configService: ConfigService) => {
    return new Redis({
      host: configService.get<string>('REDIS_HOST', 'localhost'),
      port: configService.get<number>('REDIS_PORT', 6379),
    });
  },
  inject: [ConfigService], // Inyectamos ConfigService para leer las variables de entorno
};

@Module({
  imports: [ConfigModule], // Importamos ConfigModule para acceder a variables de entorno
  providers: [RedisProvider],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
