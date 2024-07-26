import api from './apiClient';
import { LoginResponse, GetUserResponse, User } from '../types';

/**
 * Realiza o login do usuário.
 * @param {string} username - Nome de usuário.
 * @param {string} password - Senha do usuário.
 * @param {string} hash - Hash da empresa.
 * @returns {Promise<LoginResponse>} - Resposta do login contendo o token e dados do usuário.
 */
export const login = async (username: string, password: string, hash: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', { username, password, hash });
  return response.data;
};

/**
 * Realiza o logout do usuário.
 * @param {string} token - Token de autenticação do usuário.
 * @returns {Promise<any>} - Resposta da API.
 */
export const logout = async (token: string) => {
  const response = await api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

/**
 * Obtém os dados do usuário pelo nome de usuário.
 * @param {string} username - Nome de usuário.
 * @returns {Promise<GetUserResponse>} - Dados do usuário.
 */
export const getUser = async (username: string): Promise<GetUserResponse> => {
  const response = await api.get<GetUserResponse>(`/auth/check-user/${username}`);
  return response.data;
};

/**
 * Obtém a lista de todos os usuários.
 * @returns {Promise<User[]>} - Lista de usuários.
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

/**
 * Valida o token JWT.
 * @param {string} token - Token JWT a ser validado.
 * @returns {Promise<any>} - Resposta da API.
 */
export const validateToken = async (token: string) => {
  const response = await api.post('/auth/validate-jwt', { token });
  return response.data;
};

/**
 * Verifica se o token JWT é válido.
 * @param {string} token - Token JWT a ser verificado.
 * @returns {Promise<boolean>} - Resultado da verificação (true se válido, false se inválido).
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await api.post('/auth/verify', {}, { headers: { Authorization: `Bearer ${token}` } });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
