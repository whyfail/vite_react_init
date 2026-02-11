import { createStyles } from 'antd-style';
import { useNavigate } from 'react-router-dom';
import { nonComponentsChange } from '@/common/commonFun.js';
import useStoreUser from '@/stores/storeUser.js';
import { clearToken } from '@/utils/auth.js';

const useStyles = createStyles(() => ({
  root: {
    '& .content_root': {
      'userSelect': 'none',
      '& .container': {
        'position': 'relative',
        'width': '350px',
        'borderRadius': '20px',
        'padding': '40px',
        'boxSizing': 'border-box',
        'background': '#ecf0f3',
        'boxShadow': '1px 1px 3px #cbced1, -1px -1px 3px white',
        '& input': {
          caretColor: 'red',
          background: '#ecf0f3',
          padding: '10px',
          paddingLeft: '20px',
          height: '50px',
          fontSize: '14px',
          borderRadius: '50px',
          boxShadow: 'inset 6px 6px 6px #cbced1, inset -6px -6px 6px white',
        },
        '& .brand-logo': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          height: '100px',
          width: '100px',
          margin: 'auto',
          borderRadius: '50%',
          boxSizing: 'border-box',
          boxShadow: '7px 7px 10px #cbced1, -7px -7px 10px white',
        },

        '& .inputs': {
          textAlign: 'left',
          marginTop: '30px',
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
          marginBottom: '4px',
        },

        '& label:nth-of-type(2)': {
          marginTop: '12px',
        },

        '& input::placeholder': {
          color: 'gray',
        },
        '& button': {
          color: 'gray',
          padding: '10px',
          fontSize: '18px',
          borderRadius: '50px',
          background: '#ecf0f3',
          border: '1px solid #e8e8e8',
          transition: 'all 0.3s',
          boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
          marginTop: '30px',
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
}));

function HomeCenter() {
  const { styles } = useStyles();
  const navigate = useNavigate();
  // 全局状态
  const userNumber = useStoreUser(state => state.userNumber);
  const setUserNumber = useStoreUser(state => state.setUserNumber);

  return (
    <div className={styles.root}>
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
            <button onClick={() => navigate('/404')} type="button">跳转404页面</button>
            <button>
              <div class="flex items-center justify-center">
                <div class="i-bxl:baidu color-#1c74e8" />
                <div class="i-bxl:tiktok color-#000000" />
                <div class="i-bxl:unity color-red" />
                <div class="i-bxl:postgresql color-#1c74e8" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCenter;
