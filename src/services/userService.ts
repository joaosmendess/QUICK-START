import api from './apiClient';
import { User, } from '../types';

export const createUser = async (name: string, username: string, permissionGroup: string) => {
  const response = await api.post('/users', { name, username, permissionGroup });
  return response.data;
};

export const fetchUsers = async (name?: string, username?: string): Promise<User[]> => {
  const response = await api.get('/users', { params: { name, username } });
  return response.data;
};
