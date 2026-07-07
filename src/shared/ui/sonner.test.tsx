import { render } from '@testing-library/react';
import { Toaster } from './sonner';

vi.mock('sonner', () => ({
  Toaster: (props: { theme?: string }) => (
    <div data-testid="toaster" data-theme={props.theme} />
  ),
}));

describe('toaster', () => {
  it('renders sonner provider wrapper', () => {
    const { getByTestId } = render(<Toaster />);

    expect(getByTestId('toaster')).toHaveAttribute('data-theme', 'light');
  });
});
