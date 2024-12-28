/**
 * 加载组件
 */
import { Spin } from 'antd';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Loading() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Spin size="large" />
    </div>
  );
}

export default Loading;
