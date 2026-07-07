import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '@/test/render';
import LoginPage from './LoginPage';
import LoginPrism from './LoginPrism';

describe('auth pages', () => {
  it('renders login form defaults', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByPlaceholderText('请输入账号：admin')).toHaveValue('admin');
    expect(screen.getByPlaceholderText('请输入登录密码：admin')).toHaveValue('admin');
    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument();
  });

  it('validates empty login fields', async () => {
    const user = userEvent.setup();

    renderWithRouter(<LoginPage />);

    await user.clear(screen.getByPlaceholderText('请输入账号：admin'));
    await user.clear(screen.getByPlaceholderText('请输入登录密码：admin'));
    await user.click(screen.getByRole('button', { name: '登录' }));

    expect(screen.getByText('账号必填')).toBeInTheDocument();
    expect(screen.getByText('密码必填')).toBeInTheDocument();
  });

  it('stores token after successful login', async () => {
    const user = userEvent.setup();

    renderWithRouter(<LoginPage />);

    await user.click(screen.getByRole('button', { name: '登录' }));

    expect(sessionStorage.getItem('xxx_web_app_token')).toBe('123');
  });

  it('renders prism background container', () => {
    const { container } = renderWithRouter(<LoginPrism />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
