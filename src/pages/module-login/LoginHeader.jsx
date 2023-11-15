import React from 'react';
import LogoFullIcon from '@/assets/images/login/assets-logo-full.svg';

const LoginHeader = () => {
  return (
    <header h-64px p-r-24px p-l-24px flex justify-between flex-items-center>
      <img src={LogoFullIcon} alt="" w-188px h-64px />
    </header>
  );
};

export default LoginHeader;
