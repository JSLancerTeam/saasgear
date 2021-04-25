import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminLayout from '@/components/Layout/Admin';
import { setUserPlan } from '@/features/auth/userPlan';
import getUserPlanQuery from '@/queries/userPlans/getUserPlan';
import logoutQuery from '@/queries/auth/logout';

function AdminLayoutContainer() {
  const { data: userPlanData, loading: loadingUserPlan } = useQuery(
    getUserPlanQuery,
  );
  const [logout] = useMutation(logoutQuery);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      setUserPlan({
        data: userPlanData?.getUserPlan,
        loading: loadingUserPlan,
      }),
    );
  }, [userPlanData, loadingUserPlan]);

  async function signout() {
    await logout();
    history.push('/auth/signin');
  }

  return <AdminLayout signout={signout} />;
}

export default AdminLayoutContainer;
