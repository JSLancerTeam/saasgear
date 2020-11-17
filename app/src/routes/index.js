import Dashborad from '@/containers/Dashboard';
import Profile from '@/containers/Profile';
import Todo from '@/containers/Todo';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashborad,
    isSidebar: true,
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
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
