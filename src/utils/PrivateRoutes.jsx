import { Outlet, Navigate } from 'react-router-dom';

export function PrivateRoutes() {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to="/" />;
};

