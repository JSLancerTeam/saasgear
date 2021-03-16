import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

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
  const history = useHistory()

  useEffect(() => {
    if (data?.profileUser?.invitationToken) {
      history.push(`/teams/invitation/${data?.profileUser?.invitationToken}`)
    }
    dispatch(setProfileUser({ data: data?.profileUser, loading }));
  }, [data, loading]);

  useEffect(() => {
    dispatch(setUserPlan({ data: userPlanData?.getUserPlan, loading: loadingUserPlan }));
  }, [userPlanData, loadingUserPlan]);

  function signout() {
    localStorage.removeItem(JWT_STORAGE_KEY);
    history.push('/auth/signin');
  }

  return <AdminLayout signout={signout} user={data?.profileUser} />;
}

export default AdminLayoutContainer;
