import React from 'react';
import { createUseStyles } from 'react-jss';
import loginBgWhite from '@/assets/images/login/login-bg-white.png';
import LoginHeader from './LoginHeader';
import LoginMain from './LoginMain';

const useStyle = createUseStyles({
  loginWrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: '100%',
    position: 'relative',
    backgroundImage: `url(${loginBgWhite})`,
  },
  loginContainer: {
    position: 'absolute',
    top: '22%',
    left: '5%',
    minHeight: '500px',
    lineHeight: '22px',
  },
  title: {
    fontSize: 36,
    marginTop: 30,
    marginBottom: 0,
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: 16,
  },
  copyright: {
    fontSize: 14,
    position: 'absolute',
    left: '5%',
    bottom: 64,
  },
});

const LoginIndex = () => {
  const classes = useStyle();

  return (
    <div className={classes.loginWrapper}>
      <LoginHeader />
      <div className={classes.loginContainer}>
        <div>
          <h2 className={classes.title}>登录到</h2>
          <h2 className={classes.title}>TDesign Starter</h2>
          <div className={classes.subTitle}></div>
        </div>
        <LoginMain />
      </div>
      <footer className={classes.copyright}>Copyright @ 2021-2022 Tencent. All Rights Reserved</footer>
    </div>
  );
};

export default LoginIndex;
