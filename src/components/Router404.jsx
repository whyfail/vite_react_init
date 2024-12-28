/**
 * 404页面
 */
import ROUTER_404 from '@/assets/images/router/router_404.svg';
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

function Router404() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <img src={ROUTER_404} alt="" />
    </div>
  );
}

export default Router404;
