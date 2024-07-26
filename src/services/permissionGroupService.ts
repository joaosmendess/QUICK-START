import api from './apiClient';
import { PermissionGroup, Permission } from '../types';

/**
 * Obtém a lista de grupos de permissão.
 * @returns {Promise<PermissionGroup[]>} - Lista de grupos de permissão.
 */
export const fetchPermissionGroups = async (): Promise<PermissionGroup[]> => {
  const response = await api.get('/permissions-groups');
  return response.data;
};

/**
 * Cria um novo grupo de permissão.
 * @param {object} group - Dados do novo grupo de permissão.
 * @param {string} group.name - Nome do grupo de permissão.
 * @returns {Promise<any>} - Resposta da API.
 */
export const createPermissionGroup = async (group: { name: string }) => {
  const response = await api.post('/permissions-groups', group);
  return response.data;
};

/**
 * Atualiza um grupo de permissão.
 * @param {string} id - ID do grupo de permissão.
 * @param {Permission} permissions - Permissões atualizadas do grupo.
 * @param {string} name - Nome atualizado do grupo de permissão.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updatePermissionGroup = async (id: string, permissions: Permission, name: string) => {
  const response = await api.put(`/permissions-groups/${id}`, { name, permissions });
  return response.data;
};

/**
 * Deleta um grupo de permissão.
 * @param {string} id - ID do grupo de permissão.
 * @returns {Promise<any>} - Resposta da API.
 */
export const deletePermissionGroup = async (id: string) => {
  const response = await api.delete(`/permissions-groups/${id}`);
  return response.data;
};
