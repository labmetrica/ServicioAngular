export class Grupo {
  id: number;
  nombre: string;
  huecos: number;
  listaUsuarios: any[];
}

export class User {
  id: number;
  nombre: string;
  apellido: string;
  grupo: number;
  email: string;
}


