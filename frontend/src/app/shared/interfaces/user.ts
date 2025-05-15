export interface User {
  email: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  roles: ('ADMIN' | 'EDITOR' | 'USER')[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
