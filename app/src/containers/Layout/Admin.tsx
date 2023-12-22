import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminLayout from '@/components/Layout/Admin';
import { setUserPlan } from '@/features/auth/userPlan';
import { logout as logoutUser } from '@/features/auth/user';
import getUserPlanQuery from '@/queries/userPlans/getUserPlan';
import logoutQuery from '@/queries/auth/logout';

type props = {
  options:string[];
}
const AdminLayoutContainer: React.FC<props> = ({options}) => {
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
    dispatch(logoutUser());
    await logout();
    history.push('/auth/signin');
  }

  return <AdminLayout signout={signout} options={options}/>;
}

export default AdminLayoutContainer;
