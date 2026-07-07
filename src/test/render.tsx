import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

function renderWithRouter(ui: ReactElement) {
  return render(<HashRouter>{ui}</HashRouter>);
}

export { renderWithRouter };
