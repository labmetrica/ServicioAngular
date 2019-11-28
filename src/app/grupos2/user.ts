export class User {
  id: number;
  activo: boolean;
  nombre: string;
  username: string;
  apellido: string;
  password: string;
  email: string;
  grupo: number;
  tipo: string;
  roles: string[] = [];
}
