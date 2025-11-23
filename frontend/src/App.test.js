import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders Task Manager header', async () => {
  axios.get.mockResolvedValue({ data: [] });
  render(<App />);
  const linkElement = screen.getByText(/Task Manager/i);
  expect(linkElement).toBeInTheDocument();
});
