/**
 * 404页面
 */
import ROUTER_ERROR from '@/assets/images/router/router_error.svg';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  root: {
    'width': '100%',
    'height': '100%',
    'display': 'flex',
    'justifyContent': 'center',
    'textAlign': 'center',
    '& img': {
      height: '100%',
    },
  },
});

function CommonError() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <img src={ROUTER_ERROR} alt="" />
    </div>
  );
}

export default CommonError;
