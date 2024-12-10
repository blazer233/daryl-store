import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ComposedProvider } from '@tencent/unstated-next-quick';

createRoot(document.getElementById('root')).render(
  <ComposedProvider>
    <App />
  </ComposedProvider>
);
