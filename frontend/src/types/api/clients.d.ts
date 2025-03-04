export interface Client {
    dni: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    deleted_at?: string | null; 
  }