/**
 * 404页面
 */
import React from 'react';
import { createUseStyles } from 'react-jss';
import ROUTER_ERROR from '@/assets/images/router/router_error.svg';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    '& img': {
      height: '100%',
    },
  },
});

const CommonError = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <img src={ROUTER_ERROR} alt="" />
    </div>
  );
};

export default CommonError;
