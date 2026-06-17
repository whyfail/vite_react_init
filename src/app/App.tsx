import type { ReactElement } from 'react';
import dayjs from 'dayjs';
import { useRoutes } from 'react-router-dom';
import { Toaster } from '@/shared/ui/sonner';
import routes from './routes/index';
import { transformRoutes } from './routes/routeUtils';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

function App(): ReactElement {
  const pages = useRoutes(transformRoutes(routes));

  return (
    <>
      {pages}
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

export default App;
