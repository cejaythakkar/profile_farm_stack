import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useMainContext } from '../context/MainContext';
import { LoadingScreen } from 'shared-component-library';

const ProtectedLayout = () => {
  const { user, loading } = useMainContext();
  const location = useLocation();
  
  const navigate = useNavigate();

  if (loading) {
    return <LoadingScreen />;
  }
  useEffect(() => {
    if (!user?._id && !loading) {
      // navigate('/login', { state: { from: location },replace: true });
      navigate('/login', { replace: true });
      
    }
  }, [user,loading]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
