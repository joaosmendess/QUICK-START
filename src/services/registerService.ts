import api from './apiClient';

import { RegisterData } from '../types';

export const register = async (data: RegisterData) => {
  const response = await api.post('/register', {
    name: data.name,
    username: data.username,
    invitationEmail: data.invitationEmail,
    password: data.password,
    company_id: data.companyId,
  });
  return response.data;
};