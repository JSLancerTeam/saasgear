import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useDispatch } from 'react-redux';

import { JWT_STORAGE_KEY } from '@/constants';
import AdminLayout from '@/components/Layout/Admin';
import { setProfileUser } from '@/features/auth/user';

const getProfileQuery = loader('../../queries/auth/getProfile.graphql');

function AdminLayoutContainer() {
  const { data, loading } = useQuery(getProfileQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfileUser({ data, loading }));
  }, [data, loading]);

  function signout() {
    localStorage.removeItem(JWT_STORAGE_KEY);
  }

  return <AdminLayout signout={signout} infoUser={data && data.profileUser} />;
}

export default AdminLayoutContainer;
