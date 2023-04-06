import { useNProgress } from '@tanem/react-nprogress';
import React from 'react';

const PROGRESS_COLOR = '#00b96b';

const Bar = ({ animationDuration, progress }) => (
  <div
    style={{
      background: PROGRESS_COLOR,
      height: 2,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: 'fixed',
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: '100%',
      zIndex: 1031,
    }}
  >
    <div
      style={{
        boxShadow: `0 0 10px ${PROGRESS_COLOR}, 0 0 5px ${PROGRESS_COLOR}`,
        display: 'block',
        height: '100%',
        opacity: 1,
        position: 'absolute',
        right: 0,
        transform: 'rotate(3deg) translate(0px, -4px)',
        width: 100,
      }}
    />
  </div>
);

const Container = ({ animationDuration, children, isFinished }) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

const CommonProgress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      {/* 这个例子没有使用旋转器组件，所以UI保持不变整洁。你可以随意渲染任何适合你的 */}
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};

export default CommonProgress;
