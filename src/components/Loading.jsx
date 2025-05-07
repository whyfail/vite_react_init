/**
 * 加载组件
 */
import { Spin } from 'antd';

function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}

export default Loading;
