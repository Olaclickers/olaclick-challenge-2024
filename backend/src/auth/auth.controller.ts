import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto, TokenDto } from './dto/create-auth.dto';
import AuthResponse from './interfaces/auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
    @ApiBody({ type: CreateAuthDto, description: 'Login del Usuario' })
    @ApiOperation({ summary: 'Login JWT de Usuario' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    async login(@Body() createAuthDto: CreateAuthDto): Promise<AuthResponse> {
        return await this.authService.signIn(createAuthDto);
    }

    @Post('validate/token')
    @ApiBody({ type: TokenDto, description: 'Token del Usuario' })
    @ApiOperation({ summary: 'JWT de Usuario' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @HttpCode(200)
    async validateToken(@Body() tokenDto: TokenDto) {
        return await this.authService.validateToken(tokenDto);
    }
}
