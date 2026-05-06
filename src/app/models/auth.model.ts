export interface LoginRequest {
  email: string;
  senha?: string;
}

export interface UserRegisterRequest {
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  dataAniversario?: string;
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