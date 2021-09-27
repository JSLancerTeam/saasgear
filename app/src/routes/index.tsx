import React from 'react';
import Dashborad from '@/containers/Dashboard';
import Profile from '@/containers/Profile';
import Document from '@/containers/Document';
import ActionDocument from '@/containers/Document/Action';
import ViewDocument from '@/containers/Document/View';
import Teams from '@/containers/Teams';
import { ReactComponent as DashboardIcon } from '@/assets/images/svg/dashboard.svg';
import { ReactComponent as DocumentIcon } from '@/assets/images/svg/document.svg';
import { ReactComponent as UserIcon } from '@/assets/images/svg/user.svg';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    exact: false,
    component: Dashborad,
    icon: <DashboardIcon />,
    isSidebar: true,
  },
  {
    path: '/document',
    name: 'Document',
    exact: true,
    component: Document,
    icon: <DocumentIcon />,
    isSidebar: true,
  },
  {
    path: '/teams',
    name: 'Teams',
    exact: false,
    component: Teams,
    icon: <UserIcon />,
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
];

export default routes;
