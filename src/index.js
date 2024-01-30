/* eslint-disable import/no-named-as-default-member */
import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line import/no-named-as-default
import App from './components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />,
    </BrowserRouter>,
  </StrictMode>,
);
