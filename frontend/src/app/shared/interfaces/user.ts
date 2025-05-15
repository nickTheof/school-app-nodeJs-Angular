export interface User {
  email: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  roles: 'ADMIN' | 'EDITOR' | 'READER'[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
