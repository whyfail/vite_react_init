import LogoFullIcon from '@/assets/images/login/assets-logo-full.svg';
import LoginMain from './LoginMain.jsx';

function LoginIndex() {
  return (
    <div className="animate__animated animate__fadeIn bg-[100%] bg-[url(@/assets/images/login/login-bg-white.png)] flex flex-col h-100vh bg-cover">
      <header className="p-24px flex h-64px flex-items-center justify-between">
        <img src={LogoFullIcon} alt="" className="h-64px w-188px" />
      </header>
      <div className="line-height-22px min-h-500px left-5% top-22% absolute">
        <div>
          <h2 className="text-36px font-bold mb-0 mt-30px">登录到</h2>
          <h2 className="text-36px font-bold mb-0 mt-30px">TDesign Starter</h2>
          <div className="mt-16px"></div>
        </div>
        <LoginMain />
      </div>
      <footer className="text-14px bottom-64px left-5% absolute">
        Copyright @ 2021-2022 Tencent. All Rights Reserved
      </footer>
    </div>
  );
}

export default LoginIndex;
