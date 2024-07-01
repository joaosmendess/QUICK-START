import { useState, useEffect } from "react";
import {
  createPermissionGroup,
  fetchPermissionGroups,
  fetchModules,
  fetchPermissionGroupsHasModule,
  updatePermissionGroupHasModule,
  createPermissionGroupHasModule,
  deletePermissionGroup,
} from "../services/auth";
import { SelectChangeEvent } from "@mui/material";
import {
  PermissionGroup,
  Permission,
  Module,
  PermissionGroupHasModule,
} from "../types";

interface UsePermissionsParams {
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePermissions = ({
  isEditMode = false,
  setIsEditMode,
}: UsePermissionsParams = {}) => {
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>(
    []
  );
  const [modules, setModules] = useState<Module[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false); // Adicionando deleteLoading
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [currentPermissions, setCurrentPermissions] = useState<Permission>({
    id: 0,
    name: "",
    get: 1,
    post: 0,
    put: 0,
    delete: 0,
    modules_id: 1,
    permissions_groups_id: 0,
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPermissionGroups, fetchedModules] = await Promise.all([
          fetchPermissionGroups(),
          fetchModules(),
        ]);
        setPermissionGroups(fetchedPermissionGroups);
        setModules(fetchedModules);
      } catch (error) {
        setError("Erro ao carregar dados");
        console.error("Erro ao carregar dados", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleTabChange = (
    _event: React.ChangeEvent<object>,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  const handleSaveGroupName = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const newGroup = await createPermissionGroup({ name: groupName });
      setSelectedGroup(newGroup.id);
      setSuccess("Nome do grupo salvo com sucesso!");
      setTabValue(1);
    } catch (error) {
      console.error("Erro ao salvar nome do grupo", error);
      setError("Erro ao salvar nome do grupo");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePermissions = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (selectedGroup) {
        const newPermissionGroupHasModule: PermissionGroupHasModule = {
          permissions_groups_id: selectedGroup,
          modules_id: currentPermissions.modules_id,
          get: currentPermissions.get,
          post: currentPermissions.post,
          put: currentPermissions.put,
          delete: currentPermissions.delete,
          id: currentPermissions.id,
          created_at: currentPermissions.created_at,
          updated_at: currentPermissions.updated_at,
        };
        if (isEditMode) {
          await updatePermissionGroupHasModule(newPermissionGroupHasModule);
          setSuccess("Permissões atualizadas com sucesso!");
        } else {
          await createPermissionGroupHasModule(newPermissionGroupHasModule);
          setSuccess("Permissões criadas com sucesso!");
        }
        resetForm();
      }
    } catch (error) {
      console.error("Erro ao salvar permissões", error);
      setError("Erro ao salvar permissões");
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async (
    groupId: number
  ): Promise<PermissionGroupHasModule> => {
    setLoading(true);
    try {
      const permissions = await fetchPermissionGroupsHasModule(groupId);
      return permissions;
    } catch (error) {
      console.error("Erro ao buscar permissões", error);
      setError("Erro ao buscar permissões");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setGroupName("");
    setCurrentPermissions({
      id: 0,
      name: "",
      get: 1,
      post: 0,
      put: 0,
      delete: 0,
      modules_id: 1,
      permissions_groups_id: 0,
      created_at: "",
      updated_at: "",
    });
    setSelectedGroup(null);
    setTabValue(0);
    if (setIsEditMode) {
      setIsEditMode(false); // Resetando o modo de edição
    }
  };

  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPermissions((prevPermissions) => ({
      ...prevPermissions,
      [event.target.name]: event.target.checked ? 1 : 0,
    }));
  };

  const handleGroupChange = async (
    event: SelectChangeEvent<number | string>
  ) => {
    const groupId = event.target.value as number;
    const group = permissionGroups.find((g) => g.id === groupId);
    if (group) {
      setSelectedGroup(group.id);
      setGroupName(group.name);
      const permissions = await fetchPermissions(group.id);
      setCurrentPermissions({
        ...currentPermissions,
        get: permissions.get,
        post: permissions.post,
        put: permissions.put,
        delete: permissions.delete,
        modules_id: permissions.modules_id,
        permissions_groups_id: group.id,
      });
      if (setIsEditMode) {
        setIsEditMode(true); // Definindo o modo de edição
      }
    }
  };

  const handleModuleChange = (event: SelectChangeEvent<number | string>) => {
    const moduleId = event.target.value as number;
    setCurrentPermissions({
      ...currentPermissions,
      modules_id: moduleId,
    });
  };

  const deletePermission = async (permissionId: number) => {
    setDeleteLoading(true);
    try {
      await deletePermissionGroup(permissionId.toString());
      setPermissionGroups(
        permissionGroups.filter((permission) => permission.id !== permissionId)
      );
      setSuccess("Permissão excluída com sucesso");
      setError(null);
    } catch (error) {
      setError("Erro ao excluir permissão");
      setSuccess(null);
      console.error("Erro ao excluir permissão", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    permissionGroups,
    modules,
    initialLoading,
    loading,
    deleteLoading, // Retornando deleteLoading
    error,
    success,
    tabValue,
    setTabValue,
    groupName,
    setGroupName,
    selectedGroup,
    setSelectedGroup,
    currentPermissions,
    setCurrentPermissions,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
    handleModuleChange,
    fetchPermissions,
    deletePermission,
  };
};
