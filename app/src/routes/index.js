import Dashborad from '@/containers/Dashboard';
import Profile from '@/containers/Profile';
import Teams from '@/containers/Teams';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashborad,
    isSidebar: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    isSidebar: false,
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams,
    isSidebar: false,
  },
];

export default routes;
