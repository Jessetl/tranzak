import { useAuth } from '@/presentation/hooks/useAuth';

const AppShellHeader = (): React.JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className='w-10 h-10 bg-gray-200 rounded-full' />
      <div className='text-sm text-gray-500'>
        {isAuthenticated ? 'Sesion activa' : 'Sesion inactiva'}
      </div>
    </>
  );
};

export default AppShellHeader;
