import {
  ChartBarIcon,
  HomeIcon,
  PlusIcon,
  UserCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

const AppShellFooter = (): React.JSX.Element => {
  return (
    <footer className='fixed bottom-0 left-1/2 z-30 w-full max-w-sm -translate-x-1/2 bg-white shadow-[0_-14px_30px_-22px_rgba(15,23,42,0.7)]'>
      <button
        type='button'
        aria-label='Agregar'
        className='absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2EA67A] text-white shadow-[0_12px_24px_-12px_rgba(46,166,122,0.8)] transition hover:brightness-105'
      >
        <PlusIcon className='h-7 w-7' />
      </button>

      <nav className='grid grid-cols-5 items-stretch pb-3 text-[11px] font-medium text-gray-500'>
        <button
          type='button'
          className='flex h-full flex-col items-center gap-1 border-t-2 border-[#2EA67A] pb-1 pt-3 text-gray-700'
        >
          <HomeIcon className='h-5 w-5' />
          Dashboard
        </button>

        <button
          type='button'
          className='flex h-full flex-col items-center gap-1 border-t-2 border-transparent pb-1 pt-3 transition hover:border-[#2EA67A]'
        >
          <ChartBarIcon className='h-5 w-5' />
          Reportes
        </button>

        <span
          aria-hidden='true'
          className='h-full border-t-2 border-transparent pt-3'
        />

        <button
          type='button'
          className='flex h-full flex-col items-center gap-1 border-t-2 border-transparent pb-1 pt-3 transition hover:border-[#2EA67A]'
        >
          <WalletIcon className='h-5 w-5' />
          Presupuesto
        </button>

        <button
          type='button'
          className='flex h-full flex-col items-center gap-1 border-t-2 border-transparent pb-1 pt-3 transition hover:border-[#2EA67A]'
        >
          <UserCircleIcon className='h-5 w-5' />
          Perfil
        </button>
      </nav>
    </footer>
  );
};

export default AppShellFooter;
