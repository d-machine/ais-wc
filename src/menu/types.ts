export interface MenuItem {
  label: string;
  children?: MenuItem[];
  action?: () => void;
} 