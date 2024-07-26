import api from './apiClient';
import { Module, PermissionGroupHasModule } from '../types';

/**
 * Obtém a lista de módulos.
 * @returns {Promise<Module[]>} - Lista de módulos.
 */
export const getModules = async (): Promise<Module[]> => {
  const response = await api.get<Module[]>('/modules');
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
