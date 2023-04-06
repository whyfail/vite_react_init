import React from 'react';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import otherMobx from '../../store/storeOther';
import './index.less';
import { useNavigate } from 'react-router-dom';

const myStyles = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
});

const MapIndex = observer(() => {
  const classes = myStyles();
  const navigate = useNavigate();

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
            <button onClick={() => navigate('/login')}>跳转login</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MapIndex;
