import { useOutlet } from 'react-router-dom';

function LayoutIndex() {
  const currentOutlet = useOutlet();

  return currentOutlet;
}

export default LayoutIndex;
