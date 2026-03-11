import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../../../router/Router';
import MainLayout from '@/shared/components/Layouts/MainLayout';

const AppShell = (): React.JSX.Element => {
  return (
    <MainLayout fullScreen>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MainLayout>
  );
};

export default AppShell;
