import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout(): ReactElement {
  return <Outlet />;
}

export default AppLayout;
