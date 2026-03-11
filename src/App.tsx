import { ThemeProvider } from './presentation/providers/ThemeProvider';
import { AuthProvider } from './presentation/providers/AuthProvider';
import AppShell from './presentation/components/shells/AppShell';

function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
