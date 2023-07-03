/**
 * 加载组件
 */
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Spin } from 'antd';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;
