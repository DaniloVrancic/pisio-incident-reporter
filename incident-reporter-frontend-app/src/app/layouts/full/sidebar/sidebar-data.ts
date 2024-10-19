import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Statistics',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Map',
    iconName: 'map-2',
    route: '/map',
  },
  {
    displayName: 'Description',
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
