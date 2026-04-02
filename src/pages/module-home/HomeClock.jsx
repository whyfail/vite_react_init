import { useRequest } from 'ahooks';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    padding: '20px 30px',
    borderRadius: '16px',
    background: '#ecf0f3',
    boxShadow: '7px 7px 14px #cbced1, -7px -7px 14px white',
    minWidth: '200px',
  },
  time: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  date: {
    fontSize: '16px',
    color: '#666',
    marginTop: '8px',
    fontWeight: '500',
  },
  week: {
    fontSize: '14px',
    color: '#999',
    marginTop: '4px',
  },
}));

function formatTime() {
  const now = new Date();

  // 格式化时间 HH:MM:SS
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}:${seconds}`;

  // 格式化日期 YYYY年MM月DD日
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}年${month}月${day}日`;

  // 格式化星期
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekStr = weekDays[now.getDay()];

  return {
    time: timeStr,
    date: dateStr,
    week: weekStr,
  };
}

function HomeClock() {
  const { styles } = useStyles();
  const { data } = useRequest(formatTime, {
    pollingInterval: 1000,
  });

  return (
    <div className={styles.root}>
      <div className={styles.time}>{data?.time}</div>
      <div className={styles.date}>{data?.date}</div>
      <div className={styles.week}>{data?.week}</div>
    </div>
  );
}

export default HomeClock;
