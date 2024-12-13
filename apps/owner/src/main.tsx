import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/router.tsx';

import './sentry';

import '@/styles/index.css';
import '@daeng-ggu/design-system/styles/index.css';

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
