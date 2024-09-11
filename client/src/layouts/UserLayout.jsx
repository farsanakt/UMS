import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../compontes/Header';


const UserLayout = () => {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
};

export default UserLayout;
