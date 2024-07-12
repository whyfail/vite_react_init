import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { nonComponentsChangeRecoil } from '@/common/common-fun';
import { userNumber } from '@/stores/store-user';
import { clearToken } from '@/utils/auth';

const myStyles = createUseStyles({
  root: {
    width: '100%',
    height: '1200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    '& .content_root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
      '& .container': {
        position: 'relative',
        width: 350,
        borderRadius: 20,
        padding: 40,
        boxSizing: 'border-box',
        background: '#ecf0f3',
        boxShadow: '1px 1px 3px #cbced1, -1px -1px 3px white',
        '& input': {
          caretColor: 'red',
          background: '#ecf0f3',
          padding: 10,
          paddingLeft: 20,
          height: 50,
          fontSize: 14,
          borderRadius: 50,
          boxShadow: 'inset 6px 6px 6px #cbced1, inset -6px -6px 6px white',
        },
        '& .brand-logo': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          height: 100,
          width: 100,
          margin: 'auto',
          borderRadius: '50%',
          boxSizing: 'border-box',
          boxShadow: '7px 7px 10px #cbced1, -7px -7px 10px white',
        },

        '& .inputs': {
          textAlign: 'left',
          marginTop: 30,
        },

        '& label,input,button': {
          display: 'block',
          width: '100%',
          padding: 0,
          border: 'none',
          outline: 'none',
          boxSizing: 'border-box',
        },

        '& label': {
          marginBottom: 4,
        },

        '& label:nth-of-type(2)': {
          marginTop: 12,
        },

        '& input::placeholder': {
          color: 'gray',
        },
        '& button': {
          color: 'gray',
          padding: 10,
          fontSize: 18,
          borderRadius: 50,
          background: '#ecf0f3',
          border: '1px solid #e8e8e8',
          transition: 'all 0.3s',
          boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
          marginTop: 30,
          cursor: 'pointer',
        },
        '& button:hover': {
          border: '1px solid white',
        },

        '& button:active ': {
          boxShadow: '4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff',
        },
      },
    },
  },
});

const Index = () => {
  const classes = myStyles();
  const navigate = useNavigate();
  // 全局状态
  const [number, setNumber] = useRecoilState(userNumber);

  return (
    <div className={classes.root}>
      <div className="content_root">
        <div className="container">
          <div className="brand-logo">{number}</div>
          <div className="inputs">
            <button onClick={() => setNumber(number + 1)}>+</button>
            <button onClick={() => setNumber(number - 1)}>-</button>
            <button onClick={nonComponentsChangeRecoil} className="font-bold important-text-red">
              组件外修改状态
            </button>
            <button
              onClick={() => {
                clearToken();
                navigate('/login');
              }}
            >
              跳转登录页
            </button>
            <button onClick={() => navigate('/other')}>跳转子页面</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
