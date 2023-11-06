/**
 * @name LayoutContent
 * @desc 内容区域
 */
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useOutlet } from 'react-router-dom';
import RouterTransition from '@/components/RouterTransition';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    padding: '20px',
  },
});

const LayoutContent = () => {
  const currentOutlet = useOutlet();
  const classes = useStyle();

  return (
    <main className={classes.root}>
      <RouterTransition>{currentOutlet}</RouterTransition>
    </main>
  );
};

export default LayoutContent;
