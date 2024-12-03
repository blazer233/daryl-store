import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ComposedProvider } from 'daryl-store';

createRoot(document.getElementById('root')).render(
  <ComposedProvider>
    <App />
  </ComposedProvider>
);
