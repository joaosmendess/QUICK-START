import api from './apiClient';
import { User } from '../types';

/**
 * Obtém a lista de usuários.
 * @returns {Promise<User[]>} - Lista de usuários.
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

/**
 * Obtém os dados de um usuário pelo ID.
 * @param {number} id - ID do usuário.
 * @returns {Promise<User>} - Dados do usuário.
 */
export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

/**
 * Cria um novo usuário.
 * @param {string} name - Nome do usuário.
 * @param {string} username - Nome de usuário.
 * @param {string} invitationEmail - Email de convite do usuário.
 * @param {number} companyId - ID da empresa.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<User>} - Usuário criado.
 */
export const createUser = async (name: string, username: string, invitationEmail: string, companyId: number, password: string): Promise<User> => {
  const response = await api.post('/users', {
    name,
    username,
    invitationEmail,
    companyId,
    password
  });
  return response.data;
};

/**
 * Atualiza os dados de um usuário.
 * @param {User} data - Dados do usuário a serem atualizados.
 * @returns {Promise<User>} - Usuário atualizado.
 */
export const updateUser = async (data: User): Promise<User> => {
  const response = await api.put(`/users/${data.id}`, data);
  return response.data;
};

/**
 * Deleta um usuário.
 * @param {number} id - ID do usuário.
 * @returns {Promise<void>} - Resposta da API.
 */
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};


/**
 * Obtém todos os usuários de uma determinada empresa
 * @param {idCompany}
 * @returns {Promise<any>}
 */
export const getUsersByCompanyId = async (idCompany: number) => {
  const response = await api.get(`/companies/${idCompany}/users`);
  return response.data
}
