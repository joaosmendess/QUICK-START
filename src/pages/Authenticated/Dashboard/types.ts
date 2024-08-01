export type UserStats = {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalCompanies: number; // Adiciona esta linha
};
  
  export type UsersPerCompany = { name: string; value: number }[];
  