import axios from "axios";
import {
  Permission,
  User,
  Module,
  LoginResponse,
  PermissionGroup,
  PermissionGroupHasModule,
  UserHasPermission,
  Application,
} from "../types";

const api = axios.create({
  baseURL: "http://10.1.1.151:8989/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login?expired=true";
    }
    return Promise.reject(error);
  }
);

export const login = async (
  userName: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    userName,
    password,
  });
  return response.data;
};

export const createUser = async (
  name: string,
  userName: string,
  permissionGroup: string
) => {
  const response = await api.post("/users", {
    name,
    userName,
    permissionGroup,
  });
  return response.data;
};

export const fetchUsers = async (
  name?: string,
  userName?: string
): Promise<User[]> => {
  const response = await api.get("/users", {
    params: { name, userName },
  });
  return response.data;
};

export const fetchPermissionGroups = async (): Promise<PermissionGroup[]> => {
  const response = await api.get("/permissions-groups");
  return response.data;
};

export const updateUserPermissionGroup = async (
  userId: number,
  permissionGroup: string
) => {
  const response = await api.put(`/users/${userId}/permissions`, {
    permissionGroup,
  });
  return response.data;
};

export const fetchModules = async (): Promise<Module[]> => {
  const response = await api.get("/modules");
  return response.data;
};

export const createPermissionGroup = async (group: { name: string }) => {
  const response = await api.post("/permissions-groups", group);
  return response.data;
};

export const updatePermissionGroup = async (
  id: string,
  permissions: Permission,
  name: string
) => {
  const response = await api.put(`/permissions-groups/${id}`, {
    name,
    permissions,
  });
  return response.data;
};

export const deletePermissionGroup = async (id: string) => {
  const response = await api.delete(`/permissions-groups/${id}`);
  return response.data;
};

export const createModule = async (name: string, empresa_id: number) => {
  const response = await api.post("/modules", { name, empresa_id });
  return response.data;
};

export const updateModule = async (
  id: string,
  name: string,
  empresa_id: number
) => {
  const response = await api.put(`/modules/${id}`, { name, empresa_id });
  return response.data;
};

export const deleteModule = async (id: string) => {
  const response = await api.delete(`/modules/${id}`);
  return response.data;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await api.post(
      "/auth/verify",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Ajustar para buscar dados específicos

export const fetchPermissionGroupsHasModule = async (
  groupId: number
): Promise<PermissionGroupHasModule> => {
  const response = await api.get<PermissionGroupHasModule>(
    `/permissions-groups-has-modules/${groupId}`
  );
  return response.data;
};

export const fetchUserHasPermissions = async (): Promise<
  UserHasPermission[]
> => {
  const response = await api.get("/user-has-permissions");
  return response.data;
};

export const createPermissionGroupHasModule = async (
  permissions: PermissionGroupHasModule
) => {
  const response = await api.post("/permissions-groups-has-modules", {
    get: permissions.get === 1,
    post: permissions.post === 0,
    put: permissions.put === 0,
    delete: permissions.delete === 0,
    modules_id: permissions.modules_id,
    permissions_groups_id: permissions.permissions_groups_id,
  });
  return response.data;
};
export const updatePermissionGroupHasModule = async (
  permissions: PermissionGroupHasModule
) => {
  const response = await api.put(
    `/permissions-groups-has-modules/${permissions.id}`,
    {
      get: permissions.get === 1,
      post: permissions.post === 1,
      put: permissions.put === 1,
      delete: permissions.delete === 1,
      modules_id: permissions.modules_id,
      permissions_groups_id: permissions.permissions_groups_id,
    }
  );
  return response.data;
};

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await api.get("/applications");
  return response.data;
};

export default api;
