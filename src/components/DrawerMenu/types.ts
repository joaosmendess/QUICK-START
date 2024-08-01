import { ReactNode } from 'react';

export interface NavigationSubItem {
  id?: string;
  label: string;
  path: string;
}

export interface NavigationItem {
  id?: string;
  label: string;
  path?: string;
  icon: ReactNode;
  subItems?: NavigationSubItem[];
}
