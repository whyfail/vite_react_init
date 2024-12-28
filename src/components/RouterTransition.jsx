/**
 * 路由过渡动画组件
 */
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import 'nprogress/nprogress.css';

function RouterTransition({ children }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

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
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
}

export default RouterTransition;
