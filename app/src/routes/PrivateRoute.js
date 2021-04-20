import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';

// Queries
import getProfileQuery from '@/queries/auth/getProfile';

// Actions
import { setProfileUser } from '@/features/auth/user';

const PrivateRoute = ({ render }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [getProfile, { data: userProfile, loading: loadingUserProfile }] = useLazyQuery(
    getProfileQuery,
  );
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.profileUser) {
      if (userProfile?.profileUser?.invitationToken) {
        history.push(`/teams/invitation/${data?.profileUser?.invitationToken}`);
      }
      dispatch(setProfileUser({ data: userProfile.profileUser, loading: loadingUserProfile }));
    }
  }, [userProfile]);

  return (
    <>
      {data && data.id && !loadingUserProfile && (
        <Route
          render={ props => render(props)}
        />
      )}
      {(!data || !data.id || loadingUserProfile) && (
        <div>Loading...</div>
      )}
    </>
  );
};

PrivateRoute.propTypes = {
  render: PropTypes.func,
};

export default PrivateRoute;
