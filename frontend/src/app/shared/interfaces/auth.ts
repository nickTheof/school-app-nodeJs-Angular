export interface LoggedInUser {
  _id: string;
  email: string;
  roles: ('ADMIN' | 'EDITOR' | 'USER')[];
  exp: number;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  data: string;
}
