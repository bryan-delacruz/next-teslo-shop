import { render, screen } from '@testing-library/react';
import { Title } from './Title';

describe('Title Component', () => {

  test('renders title correctly', () => {
    const title = 'Test Title';
    render(<Title title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('renders subtitle when provided', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    render(<Title title={title} subtitle={subtitle} />);

    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  test('applies custom class name', () => {
    const title = 'Test Title';
    const className = 'custom-class';
    const { container } = render(<Title title={title} className={className} />);

    // Check if the first child has the custom class
    // Note: implementation details might change, but Title uses a wrapper div
    expect(container.firstChild).toHaveClass(className);
  });

});
