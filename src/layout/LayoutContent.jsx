/**
 * @name LayoutContent
 * @desc 内容区域
 */
import React from 'react';
import { useOutlet } from 'react-router-dom';
import RouterTransition from '@/components/RouterTransition';

const LayoutContent = () => {
  const currentOutlet = useOutlet();

  return <RouterTransition>{currentOutlet}</RouterTransition>;
};

export default LayoutContent;
