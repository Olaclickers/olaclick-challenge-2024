import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto, TokenDto } from './dto/create-auth.dto';
import AuthResponse, { UserResonse } from './interfaces/auth.interfaces';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService) { }


    @Post('login')
    @ApiBody({ type: CreateAuthDto, description: 'Login del Usuario' })
    @ApiOperation({ summary: 'Login JWT de Usuario' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    async login(@Body() signInDto: CreateAuthDto): Promise<AuthResponse | any> {
        return await this.authServices.signIn(signInDto);
    }

    @Post('validate/token')
    @ApiBody({ type: TokenDto, description: 'Token del Usuario' })
    @ApiOperation({ summary: 'JWT de Usuario' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @HttpCode(200)
    async validateToken(@Body() tokenDto: TokenDto): Promise<UserResonse | any> {
        return await this.authServices.validateToken(tokenDto);
    }
}
