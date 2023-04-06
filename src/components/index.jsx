import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { createUseStyles } from 'react-jss';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../assets/css/router-transition.less';

// 路由懒加载
const LoginIndex = lazy(() => import('../components/module-login/index'));
const MapIndex = lazy(() => import('../components/module-map/index'));

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const Index = () => {
  const classes = useStyle();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isLoading ? NProgress.start() : NProgress.done();
  }, [isLoading]);

  return (
    <>
      {/* 路由跳转过渡 */}
      <SwitchTransition className={classes.root}>
        <CSSTransition
          key={location.key}
          unmountOnExit
          timeout={500}
          classNames="dg"
          onEnter={() => {
            setIsLoading(true);
          }}
          onEntered={() => {
            setIsLoading(false);
          }}
        >
          <Suspense fallback={<div>loading...</div>}>
            <Routes location={location}>
              <Route element={<MapIndex />} path="/" />
              <Route element={<LoginIndex />} path="/login" />
              <Route element={<div>Not Found</div>} path="*" />
            </Routes>
          </Suspense>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Index;
