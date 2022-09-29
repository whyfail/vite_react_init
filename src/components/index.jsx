import React from 'react';
import { Button } from 'antd';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import otherMobx from '../store/storeOther';
import './index.less';

const myStyles = createUseStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
  },
});

const index = observer(() => {
  const classes = myStyles();

  // 全局状态
  const { number, addNumber, subtractNumber } = otherMobx;

  return (
    <div className={classes.root}>
      <div id="holder">
        <h1>
          <Button type="primary" onClick={addNumber}>
            +
          </Button>
          <Button>{number}</Button>
          <Button type="primary" onClick={subtractNumber}>
            -
          </Button>
        </h1>
        <div id="portals">
          <span>
            <span>
              <span>
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <span>
                            <span></span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>{' '}
        </div>
      </div>
    </div>
  );
});

export default index;
