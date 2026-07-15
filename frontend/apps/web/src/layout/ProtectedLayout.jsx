import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useMainContext } from '../context/MainContext';
import WithLayout from '../HOC/withLayout'

const ProtectedLayout = () => {
  const { user, loading } = useMainContext();
  const location = useLocation();
  console.log(user,location);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading.....</div>;
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
