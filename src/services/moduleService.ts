import api from './apiClient';
import { Module, PermissionGroupHasModule, } from '../types';

export interface Application {
  id?: number; // Tornar opcional, pois não é necessário para criação
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
  companyId: number;
  logo: string;
}
/**
 * Obtém a lista de módulos.
 * @returns {Promise<Module[]>} - Lista de módulos.
 */
export const getModules = async (): Promise<Module[]> => {
  const response = await api.get<Module[]>('/public/modules');
  return response.data;
};

/**
 * Cria um novo módulo.
 * @param {string} name - Nome do módulo.
 * @param {number} applications_id - ID da aplicação relacionada.
 * @returns {Promise<Module>} - O módulo criado.
 */
export const createModule = async (name: string, applicationId: number): Promise<Module> => {
  const response = await api.post('/modules', { name, applicationId });
  return response.data;
};

/**
 * Atualiza um módulo existente.
 * @param {string} id - ID do módulo.
 * @param {string} name - Nome do módulo.
 * @param {number} applicationsId - ID da aplicação relacionada.
 * @returns {Promise<Module>} - O módulo atualizado.
 */
export const updateModule = async (id: string, name: string, applicationId: number): Promise<Module> => {
  const response = await api.put(`/modules/${id}`, { name, applicationId });
  return response.data;
};

/**
 * Obtém a lista de aplicações.
 * @returns {Promise<Application[]>} - Lista de aplicações.
 */
export const getApplications = async (): Promise<Application[]> => {
  const response = await api.get<Application[]>('/applications');
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
