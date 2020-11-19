import Dashborad from '@/containers/Dashboard';
import Profile from '@/containers/Profile';

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
];

export default routes;
