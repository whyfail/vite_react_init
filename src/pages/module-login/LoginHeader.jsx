import React from 'react';
import { createUseStyles } from 'react-jss';
import LogoFullIcon from '@/assets/images/login/assets-logo-full.svg';

const useStyle = createUseStyles({
  root: {
    height: '64px',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
  },
  root_log: {
    width: '188px',
    height: '64px',
  },
});

const LoginHeader = () => {
  const classes = useStyle();

  return (
    <div>
      <header className={classes.root}>
        <img src={LogoFullIcon} alt="" className={classes.root_log} />
      </header>
    </div>
  );
};

export default LoginHeader;
