import React from 'react';
import { useAuth } from '@/presentation/hooks/useAuth';

const Dashboard = (): React.JSX.Element => {
  const { user, logout } = useAuth();

  return (
    <main className='space-y-3 p-4'>
      <h1 className='text-2xl font-semibold'>Dashboard</h1>
      <p>Bienvenido al gestor de presupuesto.</p>
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        Sesion activa: {user?.email}
      </p>
      <button
        type='button'
        onClick={logout}
        className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700'
      >
        Cerrar sesion
      </button>
    </main>
  );
};

export default Dashboard;
