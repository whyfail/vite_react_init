import type { ReactElement } from 'react';
/**
 * 加载组件
 */
import { Spinner } from '@/shared/ui/spinner';

function Loading(): ReactElement {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}

export default Loading;
