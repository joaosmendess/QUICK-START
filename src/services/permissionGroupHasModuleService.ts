import api from './apiClient';
import { PermissionGroupHasModule } from '../types';

/**
 * Obtém a associação de um grupo de permissão com módulos pelo ID do grupo.
 * @param {number} groupId - ID do grupo de permissão.
 * @returns {Promise<PermissionGroupHasModule>} - Associação de grupo de permissão com módulos.
 */
export const fetchPermissionGroupsHasModule = async (groupId: number): Promise<PermissionGroupHasModule> => {
  const response = await api.get<PermissionGroupHasModule>(`/permissions-groups-has-modules/${groupId}`);
  return response.data;
};

/**
 * Cria uma nova associação de grupo de permissão com módulo.
 * @param {PermissionGroupHasModule} permissions - Dados da associação de grupo de permissão com módulo.
 * @returns {Promise<any>} - Resposta da API.
 */
export const createPermissionGroupHasModule = async (permissions: PermissionGroupHasModule) => {
  const response = await api.post('/permissions-groups-has-modules', permissions);
  return response.data;
};

/**
 * Atualiza uma associação de grupo de permissão com módulo.
 * @param {PermissionGroupHasModule} permissions - Dados atualizados da associação de grupo de permissão com módulo.
 * @returns {Promise<any>} - Resposta da API.
 */
export const updatePermissionGroupHasModule = async (permissions: PermissionGroupHasModule) => {
  const response = await api.put(`/permissions-groups-has-modules/${permissions.id}`, permissions);
  return response.data;
};
