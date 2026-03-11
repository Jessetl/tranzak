import React from 'react';

type MainLayoutProps = React.PropsWithChildren<{
  header?: React.ReactNode;
  footer?: React.ReactNode;
  fullScreen?: boolean;
}>;

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  header,
  footer,
  fullScreen = false,
}) => {
  const wrapperClass =
    'flex min-h-screen w-full justify-center bg-gray-50 dark:bg-gray-900';

  const contentClass = fullScreen
    ? 'flex min-h-screen w-full max-w-sm flex-col'
    : 'flex min-h-screen w-full max-w-sm flex-col gap-2 p-4';

  const mainClass = fullScreen
    ? 'flex-1 overflow-y-auto'
    : 'flex-1 overflow-y-auto px-2 pt-4';

  return (
    <div className={wrapperClass}>
      <div className={contentClass}>
        {header && (
          <header className='flex items-center justify-between'>
            {header}
          </header>
        )}
        <main className={mainClass}>{children}</main>
        {footer && (
          <footer className='mt-4 flex justify-center'>{footer}</footer>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
