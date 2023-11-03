import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const LayoutHeader = memo(() => {
  const classes = useStyle();

  return <div className={classes.root}>LayoutHeader</div>;
});

LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
