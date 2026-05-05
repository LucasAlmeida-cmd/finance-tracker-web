export interface LoginRequest {
  email: string;
  senha?: string;
}

export interface UserRegisterRequest {
  name: string;
  cpf: string;
  email: string;
  password?: string;
  dataAniversario?: Date;
}

export interface AuthResponse {
  token: string;
  type: string;
  email: string;
}


export interface UserResponse {
  email: string;
  nome: string;
}