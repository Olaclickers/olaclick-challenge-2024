import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { I18nContext, I18nService } from "nestjs-i18n";
import AuthResponse, { UserResonse } from "./interfaces/auth.interfaces";
import { CreateAuthDto, TokenDto } from "./dto/create-auth.dto";
import { UsersService } from "src/users/users.service";
import { CustomHttpExceptionValidate } from "src/config/exeptions/CustomHttpException";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
    // private readonly projectHierarchyService: ProjectHierarchiesService,
  ) { }

  async signIn(signInDto: CreateAuthDto): Promise<AuthResponse> {
    const user = await this.usersService.existEmailPassword(signInDto.email, signInDto.password);
    const token = await this.signToken(user);
    return {
      access_token: token,
      user: await this.buildUserResponse(user),
    } as AuthResponse;
  }

  async signToken(user: any): Promise<string> {
    const payload = { id: user.id, email: user.email, user_role: user.user_role, free_account: user.free_account };
    return this.jwtService.signAsync(payload);
  }


  async validateToken(tokenDto: TokenDto): Promise<UserResonse> {
    const { token } = tokenDto
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const id = payload.id;
      const user = await this.usersService.findById(id);
      const response: UserResonse = {
        user: await this.buildUserResponse(user),
      }
      return response;
    } catch {
      const i18n = I18nContext.current();
      const error = this.i18n.t('lang.AUTH.TOKEN_INVALID', { lang: i18n!.lang });
      throw new CustomHttpExceptionValidate("POST", "/auth/validate/token", error, "token", 401);
    }
  }

  async buildUserResponse(user: any) {

    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      user_role: user.user_role,
    };
  }
}