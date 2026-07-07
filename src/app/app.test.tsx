import { render, screen } from '@testing-library/react';
import { HashRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import AppLayout from './AppLayout';
import RouteGuard from './routes/RouteGuard';

describe('app routing components', () => {
  it('renders the app route tree', async () => {
    window.location.hash = '#/login';

    render(
      <HashRouter>
        <App />
      </HashRouter>,
    );

    expect(await screen.findByRole('heading', { name: '登录' })).toBeInTheDocument();
  });

  it('renders layout outlet', () => {
    render(
      <MemoryRouter initialEntries={['/docs']}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/docs" element={<div>Docs outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Docs outlet')).toBeInTheDocument();
  });

  it('redirects protected content when unauthenticated', () => {
    render(
      <MemoryRouter initialEntries={['/docs']}>
        <Routes>
          <Route
            path="/docs"
            element={(
              <RouteGuard meta={{ title: 'Docs', needLogin: true }}>
                <div>Protected docs</div>
              </RouteGuard>
            )}
          />
          <Route path="/login" element={<div>Login route</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Login route')).toBeInTheDocument();
    expect(screen.queryByText('Protected docs')).not.toBeInTheDocument();
  });

  it('renders protected content when authenticated', () => {
    sessionStorage.setItem('xxx_web_app_token', '123');

    render(
      <MemoryRouter initialEntries={['/docs']}>
        <RouteGuard meta={{ title: 'Docs', needLogin: true }}>
          <div>Protected docs</div>
        </RouteGuard>
      </MemoryRouter>,
    );

    expect(screen.getByText('Protected docs')).toBeInTheDocument();
  });
});
