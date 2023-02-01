import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Click the swatch that matches/i);
  expect(linkElement).toBeInTheDocument();
});
