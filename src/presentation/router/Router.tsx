import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShellFooter from '@/presentation/components/shells/AppShell/AppShellFooter';
import RouteLoadingFallback from '@/presentation/components/loaders/RouteLoadingFallback';
import ProtectedRoute from './ProtectedRoute';

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const Login = lazy(() => import('../pages/Auth/Login'));

export default function AppRouter(): React.JSX.Element {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <AppShellFooter />
      </>
    </Suspense>
  );
}
