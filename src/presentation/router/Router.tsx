import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Login = lazy(() => import('../pages/Auth/Login'));

export default function AppRouter(): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <div role='status' aria-live='polite'>
          Cargando...
        </div>
      }
      >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Suspense>
  );
}
