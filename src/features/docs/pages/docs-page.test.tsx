import { render, screen } from '@testing-library/react';
import DocsPage from './DocsPage';

describe('docsPage', () => {
  it('renders template documentation sections', () => {
    render(<DocsPage />);

    expect(screen.getByRole('heading', { name: '项目开发文档' })).toBeInTheDocument();
    expect(screen.getByText('React Template Guide')).toBeInTheDocument();
    expect(screen.getByText('推荐开发流程')).toBeInTheDocument();
  });
});
