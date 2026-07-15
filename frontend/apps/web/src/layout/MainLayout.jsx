import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'shared-component-library';
import NavBar from '../components/Navbar';
const MainLayout = () => {
  return (
    <>
      <NavBar />{' '}
      <div className="w-full body-container px-5 bg-gray-900 text-white flex-1 flex justify-center">
        <Outlet />
      </div>{' '}
      <Footer />
    </>
  );
};

export default MainLayout;
