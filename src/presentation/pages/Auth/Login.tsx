import React, { useState, useId } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sun, Moon, AlertCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '@/presentation/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const Login = (): React.JSX.Element => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  );

  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isLoginSuccessful = login({ email, password });

    if (!isLoginSuccessful) {
      setErrorMessage('Credenciales inválidas. Usa demo@budget.com / 123456');
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
    <section className='relative min-h-svh flex flex-col bg-finance-navy dark:bg-background overflow-hidden'>
      {/* Background decorative elements */}
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute -top-24 -right-24 h-72 w-72 rounded-full bg-finance-emerald/10 blur-3xl' />
        <div className='absolute top-1/3 -left-32 h-64 w-64 rounded-full bg-finance-emerald/5 blur-3xl' />
        <div className='absolute -bottom-16 right-1/4 h-56 w-56 rounded-full bg-finance-navy-soft/30 blur-3xl dark:bg-finance-emerald/5' />
      </div>

      {/* Theme Toggle */}
      <div className='relative z-10 flex justify-end p-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleTheme}
          className='rounded-full text-white/70 hover:text-white hover:bg-white/10 dark:text-text-secondary dark:hover:text-text dark:hover:bg-surface'
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {isDark ? (
            <Sun className='h-5 w-5' aria-hidden='true' />
          ) : (
            <Moon className='h-5 w-5' aria-hidden='true' />
          )}
        </Button>
      </div>

      {/* Main content */}
      <div className='relative z-10 flex flex-1 flex-col justify-center px-6 pb-8'>
        {/* Brand header */}
        <header className='mb-10 text-center'>
          <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-finance-emerald/20'>
            <TrendingUp className='h-7 w-7 text-finance-emerald-light' aria-hidden='true' />
          </div>
          <h1 className='text-3xl font-bold tracking-tight text-white dark:text-text'>
            Tranzak
          </h1>
          <p className='mt-1.5 text-sm text-white/60 dark:text-text-secondary'>
            Tu control financiero en Venezuela
          </p>
        </header>

        {/* Form */}
        <form
          className='mx-auto w-full max-w-sm space-y-5'
          onSubmit={handleSubmit}
          aria-describedby={errorMessage ? errorId : undefined}
        >
          {/* Email */}
          <div className='space-y-2'>
            <Label htmlFor={emailId} className='text-sm font-medium text-white/80 dark:text-text-secondary'>
              Correo electrónico
            </Label>
            <div className='relative'>
              <Mail
                className='absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 dark:text-text-secondary'
                aria-hidden='true'
              />
              <Input
                id={emailId}
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                placeholder='tu@correo.com'
                className={cn(
                  'h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-white/30',
                  'focus-visible:border-finance-emerald/50 focus-visible:ring-finance-emerald/20',
                  'dark:border-border dark:bg-surface dark:text-text dark:placeholder:text-text-secondary/50',
                  'dark:focus-visible:border-finance-emerald/50 dark:focus-visible:ring-finance-emerald/20',
                )}
                aria-invalid={errorMessage ? 'true' : 'false'}
              />
            </div>
          </div>

          {/* Password */}
          <div className='space-y-2'>
            <Label htmlFor={passwordId} className='text-sm font-medium text-white/80 dark:text-text-secondary'>
              Contraseña
            </Label>
            <div className='relative'>
              <Lock
                className='absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 dark:text-text-secondary'
                aria-hidden='true'
              />
              <Input
                id={passwordId}
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                placeholder='Ingresa tu contraseña'
                className={cn(
                  'h-12 rounded-xl border-white/10 bg-white/5 pl-11 pr-11 text-white placeholder:text-white/30',
                  'focus-visible:border-finance-emerald/50 focus-visible:ring-finance-emerald/20',
                  'dark:border-border dark:bg-surface dark:text-text dark:placeholder:text-text-secondary/50',
                  'dark:focus-visible:border-finance-emerald/50 dark:focus-visible:ring-finance-emerald/20',
                )}
                aria-invalid={errorMessage ? 'true' : 'false'}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 dark:text-text-secondary dark:hover:text-text dark:hover:bg-transparent'
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' aria-hidden='true' />
                ) : (
                  <Eye className='h-4 w-4' aria-hidden='true' />
                )}
              </Button>
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div
              id={errorId}
              role='alert'
              aria-live='assertive'
              className='flex items-center gap-2.5 rounded-xl border border-error/20 bg-error/10 p-3.5 text-sm text-red-300 dark:text-error'
            >
              <AlertCircle className='h-4 w-4 shrink-0' aria-hidden='true' />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Forgot password */}
          <div className='text-right'>
            <Link
              to='/forgot-password'
              className='text-sm text-white/50 transition-colors hover:text-finance-emerald-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-finance-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-finance-navy rounded dark:text-text-secondary dark:hover:text-finance-emerald'
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type='submit'
            size='lg'
            className={cn(
              'w-full h-12 rounded-xl text-base font-semibold',
              'bg-finance-emerald text-white hover:bg-finance-emerald-dark',
              'transition-all duration-150 active:scale-[0.98]',
              'focus-visible:ring-finance-emerald/30',
            )}
          >
            Iniciar sesión
          </Button>

          {/* Divider */}
          <div className='relative py-1'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-white/10 dark:border-border' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-finance-navy px-3 text-white/40 dark:bg-background dark:text-text-secondary'>
                O continúa con
              </span>
            </div>
          </div>

          {/* Social buttons */}
          <div className='grid grid-cols-2 gap-3'>
            <Button
              type='button'
              variant='outline'
              onClick={handleUseDemoCredentials}
              className={cn(
                'h-11 rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white',
                'dark:border-border dark:bg-surface dark:text-text dark:hover:bg-surface/80',
              )}
            >
              <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24' aria-hidden='true'>
                <path fill='currentColor' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
                <path fill='currentColor' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
                <path fill='currentColor' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
                <path fill='currentColor' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
              </svg>
              Google
            </Button>

            <Button
              type='button'
              variant='outline'
              className={cn(
                'h-11 rounded-xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white',
                'dark:border-border dark:bg-surface dark:text-text dark:hover:bg-surface/80',
              )}
            >
              <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24' aria-hidden='true'>
                <path fill='currentColor' d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Demo hint */}
          <button
            type='button'
            onClick={handleUseDemoCredentials}
            className={cn(
              'w-full rounded-xl p-3.5 text-center text-sm transition-colors',
              'bg-white/5 hover:bg-white/10',
              'dark:bg-surface dark:hover:bg-surface/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-finance-emerald/50',
            )}
          >
            <span className='text-white/40 dark:text-text-secondary'>Modo demo: </span>
            <span className='font-medium text-white/70 dark:text-text'>
              demo@budget.com / 123456
            </span>
          </button>
        </form>

        {/* Footer */}
        <p className='mt-8 text-center text-sm text-white/40 dark:text-text-secondary'>
          ¿No tienes una cuenta?{' '}
          <Link
            to='/register'
            className='font-semibold text-finance-emerald-light transition-colors hover:text-finance-emerald hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-finance-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-finance-navy rounded dark:text-finance-emerald dark:hover:text-finance-emerald-light'
          >
            Regístrate gratis
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
