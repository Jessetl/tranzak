import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/useAuth';

const Dashboard = (): React.JSX.Element => {
  const { user } = useAuth();

  return (
    <section className='relative min-h-screen overflow-hidden bg-white'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-56 border-b border-[#2a4760] bg-[#102940] rounded-br-4xl rounded-bl-4xl'
      />

      <div className='relative z-10 mx-auto min-h-screen w-full max-w-sm px-5 pb-8'>
        <header className='flex items-center justify-between pt-6 text-white'>
          <div>
            <p className='text-lg font-semibold tracking-tight'>
              Budget Tracker
            </p>
            <p className='text-xs text-blue-100'>Dashboard financiero</p>
          </div>

          <Link
            to='/profile'
            className='inline-flex items-center gap-2 rounded-full text-sm font-medium'
          >
            <span className='max-w-24 truncate'>Carlos Diaz</span>
            <img
              src='https://i.pravatar.cc/80?img=32'
              alt='Foto de perfil'
              className='h-8 w-8 rounded-full object-cover'
            />
          </Link>
        </header>

        <div className='mt-28 space-y-4'>
          <article className='rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)]'>
            <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
              Sesion activa
            </p>
            <p className='mt-1 truncate text-sm font-semibold text-gray-800'>
              {user?.email}
            </p>
          </article>

          <article className='rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)]'>
            <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
              Resumen
            </p>
            <p className='mt-1 text-sm text-gray-700'>
              Tu panel esta listo para agregar tarjetas de balance, ingresos y
              gastos.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
