import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import MainLayout from './layouts/MainLayout';
import { AuthProvider, RequireAuth } from './context/AuthProvider';
import { CallsProvider } from './context/CallsProvider';
import 'antd/dist/antd.css';
import './styles/main.scss';
import './styles/responsive.scss';
import './styles/form.scss';
import CallsPage from './pages/CallsPage';
import ProfilePage from './pages/ProfilePage';
import ErrorBoundary from './layouts/ErrorLayout';

interface ProtectedMainLayoutProps {
    children: ReactNode;
}

const ProtectedMainLayout = ({ children }: ProtectedMainLayoutProps) => (
  <RequireAuth>
    <MainLayout>
      {children}
    </MainLayout>
  </RequireAuth>
);

const App = () => {
  const Components: Record<string, () => JSX.Element> = {
    calls: CallsPage,
    profile: ProfilePage,
    '/profile/:ID': ProfilePage,
  };

  const SpecificRoute = (routeName: string) => {
    const Component = Components[routeName];
    return Component ? <Component /> : <h1>Not found</h1>;
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CallsProvider>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              {Object.keys(Components).map((route) => (
                <Route
                  path={`/${route}`}
                  key={route}
                  element={(
                    <ProtectedMainLayout>
                      {SpecificRoute(route)}
                    </ProtectedMainLayout>
                )}
                />
              ))}
            </Routes>
          </CallsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
