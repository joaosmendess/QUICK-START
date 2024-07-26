import api from './apiClient';
import { Invite } from '../types';

/**
 * Envia um convite para um usuário.
 * @param {string} invitationEmail - Email do usuário a ser convidado.
 * @param {number} companyId - ID da empresa.
 * @returns {Promise<Invite>} - Resposta do convite enviado.
 */
export const inviteUser = async (invitationEmail: string, companyId: number): Promise<Invite> => {
  const response = await api.post('/auth/invite', { invitationEmail, companyId });
  return response.data;
};
