import { axe } from 'jest-axe';
import { renderWithRouter } from '@/test/render';
import DocsPage from './DocsPage';

describe('docs page accessibility', () => {
  it('has no obvious accessibility violations', async () => {
    const { container } = renderWithRouter(<DocsPage />);

    await expect(axe(container)).resolves.toHaveNoViolations();
  });
});
