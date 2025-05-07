/**
 * 404页面
 */
import ROUTER_ERROR from '@/assets/images/router/router_error.svg';

function CommonError() {
  return (
    <div className="h-full w-full flex justify-center text-center">
      <img src={ROUTER_ERROR} alt="" className="h-full" />
    </div>
  );
}

export default CommonError;
