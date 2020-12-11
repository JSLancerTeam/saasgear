import Dashborad from '@/containers/Dashboard';
import Profile from '@/containers/Profile';
import Document from '@/containers/Document';
import ActionDocument from '@/containers/Document/Action';
import ViewDocument from '@/containers/Document/View';
import Teams from '@/containers/Teams';
import NewTeam from '@/containers/Teams/NewTeam';
import EditTeam from '@/containers/Teams/EditTeam';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    exact: false,
    component: Dashborad,
    isSidebar: true,
  },
  {
    path: '/document',
    name: 'Document',
    exact: true,
    component: Document,
    isSidebar: true,
  },
  {
    path: '/document/create',
    name: 'Create Document',
    exact: true,
    component: ActionDocument,
    isSidebar: false,
  },
  {
    path: '/document/edit/:id',
    name: 'Edit Document',
    exact: true,
    component: ActionDocument,
    isSidebar: false,
  },
  {
    path: '/document/view/:id',
    name: 'View Document',
    exact: true,
    component: ViewDocument,
    isSidebar: false,
  },
  {
    path: '/profile',
    name: 'Profile',
    exact: false,
    component: Profile,
    isSidebar: false,
  },
  {
    path: '/teams',
    name: 'Teams',
    exact: true,
    component: Teams,
    isSidebar: false,
  },
  {
    path: '/teams/new',
    name: 'New Team',
    component: NewTeam,
    isSidebar: false,
  },
  {
    path: '/teams/edit/:teamId',
    name: 'Edit Team',
    component: EditTeam,
    isSidebar: false,
  },
];

export default routes;
