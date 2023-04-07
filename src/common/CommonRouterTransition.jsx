/**
 * 路由过渡动画组件
 */
import React, { useState, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { createUseStyles } from 'react-jss';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../assets/css/router-transition.less';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const CommonRouterTransition = () => {
  const classes = useStyle();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const currentOutlet = useOutlet();

  useEffect(() => {
    isLoading ? NProgress.start() : NProgress.done();
  }, [isLoading]);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key}
        unmountOnExit
        appear
        timeout={500}
        classNames="dg"
        onEnter={() => {
          setIsLoading(true);
        }}
        onEntered={() => {
          setIsLoading(false);
        }}
      >
        <div className={classes.root}>{currentOutlet}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default CommonRouterTransition;
