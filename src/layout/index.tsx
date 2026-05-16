import type { ReactNode } from 'react';
import { useOutlet } from 'react-router-dom';

function LayoutIndex(): ReactNode {
  const currentOutlet = useOutlet();

  return currentOutlet;
}

export default LayoutIndex;
