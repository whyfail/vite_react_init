import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import CommonError from './CommonError';
import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';
import Router404 from './Router404';

function ThrowingComponent(): ReactElement {
  throw new Error('Boom');
}

describe('shared components', () => {
  it('renders loading state', () => {
    render(<Loading />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders static error illustrations', () => {
    const { rerender } = render(<CommonError />);

    expect(document.querySelector('img')).toBeInTheDocument();

    rerender(<Router404 />);

    expect(document.querySelector('img')).toBeInTheDocument();
  });

  it('renders children through the error boundary', () => {
    render(
      <ErrorBoundary>
        <div>Healthy child</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Healthy child')).toBeInTheDocument();
  });

  it('renders fallback when a child throws', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(document.querySelector('img')).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});
