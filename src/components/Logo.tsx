import React from 'react';

import LogoImage from 'assets/logo.png';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img className="logo__img" alt="Serapi" src={LogoImage} />
      <div className="logo__text">SERAPI</div>
    </div>
  );
};

export default Logo;
