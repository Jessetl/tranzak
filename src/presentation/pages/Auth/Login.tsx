import React, { useState } from 'react';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/useAuth';

const Login = (): React.JSX.Element => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isLoginSuccessful = login({ email, password });

    if (!isLoginSuccessful) {
      setErrorMessage('Credenciales invalidas. Usa demo@budget.com / 123456');
      return;
    }

    setErrorMessage('');
    navigate('/', { replace: true });
  };

  const handleUseDemoCredentials = () => {
    setEmail('demo@budget.com');
    setPassword('123456');
    setErrorMessage('');
  };

  return (
    <section className='relative flex h-full min-h-full items-center justify-center overflow-hidden px-4'>
      <div
        aria-hidden='true'
        className='login-blob login-blob-delay absolute -left-20 -top-24 h-56 w-56 rounded-full bg-blue-400/25 blur-3xl dark:bg-blue-500/20'
      />
      <div
        aria-hidden='true'
        className='login-blob absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20'
      />

      <div className='login-card-enter login-card-glow relative w-full max-w-sm rounded-2xl border border-white/50 bg-white/85 p-6 backdrop-blur-md dark:border-gray-700/70 dark:bg-gray-900/80'>
        <header className='mb-5 space-y-2'>
          <span className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md'>
            <SparklesIcon className='h-5 w-5' />
          </span>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
            Bienvenido de nuevo
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Inicia sesion para continuar con tu dashboard financiero.
          </p>
        </header>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200'
            >
              Correo
            </label>
            <div className='relative'>
              <EnvelopeIcon className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
              <input
                id='email'
                type='email'
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete='email'
                placeholder='demo@budget.com'
                className='w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200'
            >
              Contrasena
            </label>
            <div className='relative'>
              <LockClosedIcon className='pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete='current-password'
                placeholder='Ingresa tu contrasena'
                className='w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-11 text-sm text-gray-900 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                aria-label={
                  showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'
                }
              >
                {showPassword ? (
                  <EyeSlashIcon className='h-5 w-5' />
                ) : (
                  <EyeIcon className='h-5 w-5' />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p
              role='alert'
              className='rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300'
            >
              {errorMessage}
            </p>
          )}

          <button
            type='submit'
            className='w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          >
            Entrar al dashboard
          </button>
        </form>

        <div className='mt-4 flex items-center justify-between gap-3 text-xs'>
          <span className='text-gray-500 dark:text-gray-400'>Modo demo</span>
          <button
            type='button'
            onClick={handleUseDemoCredentials}
            className='rounded-lg border border-gray-300 px-2.5 py-1.5 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800'
          >
            Usar credenciales demo
          </button>
        </div>

        <p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
          demo@budget.com / 123456
        </p>
      </div>
    </section>
  );
};

export default Login;
