import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

function RecoilDebugLog() {
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    const allState = {};

    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      const currentDate = new Date();

      const currentHour = currentDate.getHours(); // 当前小时数（0-23）
      const currentMinute = currentDate.getMinutes(); // 当前分钟数（0-59）
      const currentSecond = currentDate.getSeconds(); // 当前秒数（0-59）

      console.debug(
        `%c${currentHour}:${currentMinute}:${currentSecond}：${node.key}改变:`,
        'background-color: #00BCD4; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; font-weight: 600;',
        snapshot.getLoadable(node).contents,
      );
    }

    for (const node of snapshot.getNodes_UNSTABLE({ isModified: false })) {
      allState[node.key] = snapshot.getLoadable(node).contents;
    }

    console.debug(
      `%call状态:`,
      'background-color: #2196f3; padding: 6px 12px; border-radius: 2px; font-size: 14px; color: #fff; font-weight: 600;',
      allState,
    );
  }, [snapshot]);

  return null;
}

export default RecoilDebugLog;
