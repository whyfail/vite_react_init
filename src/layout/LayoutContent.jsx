/**
 * @name LayoutContent
 * @desc 内容区域
 */
import React from 'react';
import { useOutlet } from 'react-router-dom';
import RouterTransition from '@/components/RouterTransition';

const LayoutContent = () => {
  const currentOutlet = useOutlet();

  return (
    <main className="h-100% min-w-1200px w-100% p-15px">
      <RouterTransition>{currentOutlet}</RouterTransition>
    </main>
  );
};

export default LayoutContent;
