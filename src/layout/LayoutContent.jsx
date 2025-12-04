import { FloatButton } from 'antd';
import { useRef } from 'react';
import { useOutlet } from 'react-router-dom';

function LayoutContent() {
  const currentOutlet = useOutlet();
  const mainRef = useRef(null);

  return (
    <main className="h-100% w-100% overflow-auto p-15px" ref={mainRef}>
      {currentOutlet}
      <FloatButton.BackTop target={() => mainRef.current} visibilityHeight={100} />
    </main>
  );
}

export default LayoutContent;
