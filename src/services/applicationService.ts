import api from './apiClient';
import { Application } from '../types';

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await api.get('/applications');
  return response.data;
};
