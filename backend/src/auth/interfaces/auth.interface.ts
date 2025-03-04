export interface IUser {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  dni: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role_id: string;
  username: string;
  active: boolean;
}

export default interface AuthResponse {
  access_token: string;
  user: IUser;
}


