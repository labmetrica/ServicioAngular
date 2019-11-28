export class Cliente {
  id: number;
  activo: boolean;
  username: string;
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  grupo: number;
  tipo: string;
  roles: string[] = [];
}
