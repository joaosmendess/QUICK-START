import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import AppsIcon from '@mui/icons-material/Apps';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'menu-dashboard',
    label: 'Início',
    path: '/dashboard',
    icon: <HomeIcon sx={{ color: '#ffffff' }} />,
  },
  {
    id: 'menu-user',
    label: 'Usuário',
    icon: <PersonIcon sx={{ color: '#ffffff' }} />,
    subItems: [
      {
        id: 'menu-manager-user',
        label: 'Gerenciamento de usuário',
        path: '/gerenciar-usuario',
      },
      {
        id: 'menu-list-users',
        label: 'Lista de usuários',
        path: '/listar-usuarios',
      },
    ],
  },
  {
    id: 'menu-permission-groups',
    label: 'Grupo de permissão',
    icon: <GroupIcon sx={{ color: '#ffffff' }} />,
    subItems: [
      {
        id: 'menu-manager-permission',
        label: 'Gerenciamento de grupo de permissão',
        path: '/gerenciar-permissao',
      },
      {
        id: 'menu-list-permissions',
        label: 'Lista de grupos de permissões',
        path: '/listar-permissoes',
      },
    ],
  },
  {
    id: 'menu-company',
    label: 'Empresa',
    icon: <BusinessIcon sx={{ color: '#ffffff' }} />,
    subItems: [
      {
        id: 'menu-manager-company',
        label: 'Gerenciamento de empresa',
        path: '/gerenciar-empresa',
      },
      {
        id: 'menu-list-companies',
        label: 'Lista de empresas',
        path: '/listar-empresas',
      },
    ],
  },
  {
    id: 'menu-application',
    label: 'Aplicações',
    icon: <AppsIcon sx={{ color: '#ffffff' }} />,
    subItems: [
      {
        id: 'menu-manager-application',
        label: 'Gerenciamento de aplicação',
        path: '/gerenciar-aplicacao',
      },
      {
        id: 'menu-list-applications',
        label: 'Lista de aplicações',
        path: '/listar-aplicacoes',
      },
    ],
  },
  {
    id: 'menu-modules',
    label: 'Módulos',
    icon: <ViewModuleIcon sx={{ color: '#ffffff' }} />,
    subItems: [
      {
        id: 'menu-manager-module',
        label: 'Gerenciamento de Módulo',
        path: '/gerenciar-modulo',
      },
      {
        id: 'menu-list-modules',
        label: 'Lista de módulos',
        path: '/listar-modulos',
      },
    ],
  },
  {
    id: 'menu-sso-user',
    label: 'Usuário SSO',
    icon: <AccountCircleIcon sx={{ color: '#ffffff' }} />,
    subItems: [
      {
        id: 'menu-manager-sso-user',
        label: 'Gerenciamento de Usuário do SSO',
        path: '/gerenciar-usuario-sso',
      },
      {
        id: 'menu-list-sso-users',
        label: 'Lista de usuários do SSO',
        path: '/listar-usuarios-sso',
      },
    ],
  },
  {
    id: 'menu-invite',
    label: 'Convidar usuário',
    path: '/convidar-usuario',
    icon: <MailOutlineIcon sx={{ color: '#ffffff' }} />,
  },
];
