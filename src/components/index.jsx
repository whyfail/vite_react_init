import React from 'react';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import otherMobx from '../store/storeOther';
import './index.less';

const myStyles = createUseStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
});

const index = observer(() => {
  const classes = myStyles();

  // 全局状态
  const { number, addNumber, subtractNumber } = otherMobx;

  return (
    <div className={classes.root}>
      <div className="content_root">
        <div className="container">
          <div className="brand-logo">{number}</div>
          <div className="inputs">
            <button onClick={addNumber}>+</button>
            <button onClick={subtractNumber}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default index;
