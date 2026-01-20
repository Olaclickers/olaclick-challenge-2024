export interface DecodedToken {
    id: string;
    dni: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    username: string;
    active: boolean;
    role: {
      id: string;
      role: string; 
    };
    iat: number;
    exp: number;
  }