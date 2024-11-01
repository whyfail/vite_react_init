import React from 'react';
import LogoFullIcon from '@/assets/images/login/assets-logo-full.svg';
import LoginMain from './LoginMain.jsx';

const LoginIndex = () => {
  return (
    <div className="animate__animated animate__fadeIn h-100vh flex flex-col bg-[100%] bg-[url(@/assets/images/login/login-bg-white.png)] bg-cover">
      <header h-64px p-r-24px p-l-24px flex justify-between flex-items-center>
        <img src={LogoFullIcon} alt="" w-188px h-64px />
      </header>
      <div className="absolute left-5% top-22% min-h-500px line-height-22px">
        <div>
          <h2 className="mb-0 mt-30px text-36px font-bold">登录到</h2>
          <h2 className="mb-0 mt-30px text-36px font-bold">TDesign Starter</h2>
          <div className="mt-16px"></div>
        </div>
        <LoginMain />
      </div>
      <footer className="absolute bottom-64px left-5% text-14px">
        Copyright @ 2021-2022 Tencent. All Rights Reserved
      </footer>
    </div>
  );
};

export default LoginIndex;
