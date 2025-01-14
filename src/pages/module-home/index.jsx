import { nonComponentsChange } from '@/common/commonFun.js';
import { useStoreUser } from '@/stores/index.js';
import { clearToken } from '@/utils/auth.js';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

const myStyles = createUseStyles({
  root: {
    'width': '100%',
    'height': '1200px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'userSelect': 'none',
    '& .content_root': {
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'userSelect': 'none',
      '& .container': {
        'position': 'relative',
        'width': 350,
        'borderRadius': 20,
        'padding': 40,
        'boxSizing': 'border-box',
        'background': '#ecf0f3',
        'boxShadow': '1px 1px 3px #cbced1, -1px -1px 3px white',
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

function Index() {
  const classes = myStyles();
  const navigate = useNavigate();
  // 全局状态
  const userNumber = useStoreUser(state => state.userNumber);
  const setUserNumber = useStoreUser(state => state.setUserNumber);

  return (
    <div className={classes.root}>
      <div className="content_root">
        <div className="container">
          <div className="brand-logo">{userNumber}</div>
          <div className="inputs">
            <button onClick={() => setUserNumber(userNumber + 1)} type="button">+</button>
            <button onClick={() => setUserNumber(userNumber - 1)} type="button">-</button>
            <button onClick={() => nonComponentsChange(userNumber + 1)} className="font-bold important-text-red" type="button">
              组件外修改状态
            </button>
            <button
              type="button"
              onClick={() => {
                clearToken();
                navigate('/login');
              }}
            >
              跳转登录页
            </button>
            <button onClick={() => navigate('/other')} type="button">跳转子页面</button>
            <div className="mt-24px">
              AutoDecimal自动转换：0.1+0.2=
              {0.1 + 0.2}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
