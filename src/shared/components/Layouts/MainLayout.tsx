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
  const wrapperClass = fullScreen
    ? 'flex min-h-screen w-full bg-gray-50 dark:bg-gray-900'
    : 'flex flex-col w-full max-w-[450px] min-h-screen m-auto p-4 bg-gray-50 dark:bg-gray-900';

  const contentClass = fullScreen
    ? 'flex min-h-screen w-full flex-col'
    : 'flex flex-col flex-1 gap-2';

  const mainClass = fullScreen ? 'flex-1 overflow-hidden' : 'flex-1 overflow-auto px-2 py-4';

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
