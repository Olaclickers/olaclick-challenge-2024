export interface CreateAuthDto {
    email: string;
    password: string;
  }
  
  export interface TokenDto {
    token: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    user: {
      id: string;
      email: string;
    };
  }