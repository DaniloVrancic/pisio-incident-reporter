import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Statistika',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Mapa',
    iconName: 'map-2',
    route: '/map',
  },
  {
    displayName: 'Opis',
    iconName: 'file-description',
    route: '/description',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
];
