import api from './apiClient';
import { UserHasPermission } from '../types';

/**
 * Obtém a lista de permissões dos usuários.
 * @returns {Promise<UserHasPermission[]>} - Lista de permissões dos usuários.
 */
export const fetchUserHasPermissions = async (): Promise<UserHasPermission[]> => {
  const response = await api.get('/user-has-permissions');
  return response.data;
};
