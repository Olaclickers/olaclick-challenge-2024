import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Bienvenida a la API' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Bienvenida a la API' })
  getHello(): string {
    return this.appService.getHello();
  }
}
