import { screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { renderWithRouter } from '@/test/render';
import LoginPage from './LoginPage';

describe('auth page accessibility', () => {
  it('has no obvious accessibility violations', async () => {
    const { container } = renderWithRouter(<LoginPage />);

    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument();
    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
