import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../../../router/Router';
import MainLayout from '@/shared/components/Layouts/MainLayout';
import AppShellHeader from './AppShellHeader';
import AppShellFooter from './AppShellFooter';
import { useAuth } from '@/presentation/hooks/useAuth';

const AppShell = (): React.JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout
      header={isAuthenticated ? <AppShellHeader /> : undefined}
      footer={isAuthenticated ? <AppShellFooter /> : undefined}
      fullScreen={!isAuthenticated}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MainLayout>
  );
};

export default AppShell;
