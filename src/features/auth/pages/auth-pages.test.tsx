import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '@/test/render';
import LoginPage from './LoginPage';
import LoginPrism from './LoginPrism';

describe('auth pages', () => {
  it('renders login form with empty defaults', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByPlaceholderText('请输入账号')).toHaveValue('');
    expect(screen.getByPlaceholderText('请输入登录密码')).toHaveValue('');
    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument();
  });

  it('validates empty login fields', async () => {
    const user = userEvent.setup();

    renderWithRouter(<LoginPage />);

    await user.click(screen.getByRole('button', { name: '登录' }));

    expect(screen.getByText('账号必填')).toBeInTheDocument();
    expect(screen.getByText('密码必填')).toBeInTheDocument();
  });

  it('stores the contract token after successful login', async () => {
    const user = userEvent.setup();

    renderWithRouter(<LoginPage />);

    await user.type(screen.getByPlaceholderText('请输入账号'), 'admin');
    await user.type(screen.getByPlaceholderText('请输入登录密码'), 'admin');
    await user.click(screen.getByRole('button', { name: '登录' }));

    await waitFor(() => {
      expect(sessionStorage.getItem('xxx_web_app_token')).toBeTruthy();
    });
  });

  it('renders prism background container', () => {
    const { container } = renderWithRouter(<LoginPrism />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
