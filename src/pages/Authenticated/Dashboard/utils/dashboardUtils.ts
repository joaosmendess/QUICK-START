import { User, Company } from '../../../../types';

export const calculateUserStats = (users: User[]) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Ativo').length;
  const inactiveUsers = totalUsers - activeUsers;

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
  };
};

export const calculateUsersPerCompany = (users: User[], companies: Company[]) => {
    // Cria um mapa para armazenar a contagem de usuários por empresa
    const usersPerCompanyMap = new Map<string, number>();
  
    // Itera sobre os usuários e conta quantos há por empresa
    users.forEach(user => {
      const company = companies.find(c => c.id === user.companyId);
      const companyName = company ? company.name : 'Unknown'; // Use 'Unknown' se a empresa não for encontrada
      const currentCount = usersPerCompanyMap.get(companyName) || 0;
      usersPerCompanyMap.set(companyName, currentCount + 1);
    });
  
    // Converte o mapa para um array de objetos
    const usersPerCompanyArray = Array.from(usersPerCompanyMap, ([name, value]) => ({ name, value }));
  
    return usersPerCompanyArray;
  };
  