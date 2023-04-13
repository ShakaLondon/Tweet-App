import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/home/i);
  // console.log(linkElement);
  
  // expect(linkElement).toBeInTheDocument();
});

// test('full app rendering/navigating', async () => {
//   render(<App />, {wrapper: BrowserRouter})

//   expect(screen.getByText(/home/i)).toBeInTheDocument()
// })
