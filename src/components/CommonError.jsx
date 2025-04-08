/**
 * 404页面
 */
import ROUTER_ERROR from '@/assets/images/router/router_error.svg';

function CommonError() {
  return (
    <div className="text-center flex h-full w-full justify-center">
      <img src={ROUTER_ERROR} alt="" className="h-full" />
    </div>
  );
}

export default CommonError;
