export interface User {
    dni: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    username?: string;
    password?: string; 
    deleted_at?: string | null;
    role_id?: string;
    status?:boolean;
  }
export interface User {
    dni: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    username: string;
    password?: string; 
    deleted_at?: string | null;
    role_id?: string ;
    status?:boolean;

  }