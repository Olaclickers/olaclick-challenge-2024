
export interface IPayloadToken {
  sub: string;
}

export interface IAuthTokenResult {
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  sub: string;
  isExpired: boolean;
}
