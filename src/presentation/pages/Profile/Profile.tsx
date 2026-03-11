import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/useAuth';

const Profile = (): React.JSX.Element => {
  const { user, logout } = useAuth();

  return (
    <section className='min-h-screen bg-white px-5 py-6'>
      <div className='mx-auto w-full max-w-sm space-y-5'>
        <header className='space-y-1'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-gray-500'>
            Perfil
          </p>
          <h1 className='text-2xl font-semibold text-gray-900'>Mi cuenta</h1>
        </header>

        <article className='rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)]'>
          <div className='flex items-center gap-3'>
            <img
              src='https://i.pravatar.cc/120?img=32'
              alt='Avatar de usuario'
              className='h-14 w-14 rounded-full object-cover'
            />
            <div>
              <p className='text-base font-semibold text-gray-900'>Carlos Diaz</p>
              <p className='text-sm text-gray-500'>{user?.email}</p>
            </div>
          </div>
        </article>

        <div className='space-y-3'>
          <Link
            to='/'
            className='block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50'
          >
            Volver al dashboard
          </Link>
          <button
            type='button'
            onClick={logout}
            className='w-full rounded-xl bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700'
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
