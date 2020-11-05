import Dashborad from 'containers/Dashboard';
import Todo from 'containers/Todo';

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
];

export default routes;
