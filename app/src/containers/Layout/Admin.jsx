import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { JWT_STORAGE_KEY } from '@/constants';
import AdminLayout from '@/components/Layout/Admin';
import { setProfileUser } from '@/features/auth/user';
import { setUserPlan } from '@/features/auth/userPlan';
import getProfileQuery from '@/queries/auth/getProfile';
import getUserPlanQuery from '@/queries/userPlans/getUserPlan';

function AdminLayoutContainer() {
  const { data, loading } = useQuery(getProfileQuery);
  const { data: userPlanData, loading: loadingUserPlan } = useQuery(getUserPlanQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfileUser({ data: data?.profileUser, loading }));
  }, [data, loading]);

  useEffect(() => {
    dispatch(setUserPlan({ data: userPlanData?.getUserPlan, loading: loadingUserPlan }));
  }, [userPlanData, loadingUserPlan]);

  function signout() {
    localStorage.removeItem(JWT_STORAGE_KEY);
  }

  return <AdminLayout signout={signout} user={data?.profileUser} />;
}

export default AdminLayoutContainer;
