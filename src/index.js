/* eslint-disable import/no-named-as-default-member */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line import/no-named-as-default
import App from './components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />,
  </StrictMode>,
);
