import { createRoot } from 'react-dom/client'

import AppProvider from './providers/AppProvider.tsx'
import AppRoutes from './routes/AppRoutes.tsx'
import api from './services/api.ts';
import { Utils } from './utils/index.ts';
const token = localStorage.getItem('authToken');

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  Utils.jwtUtils.decodeJWT();
}

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <AppRoutes />
  </AppProvider>
)
