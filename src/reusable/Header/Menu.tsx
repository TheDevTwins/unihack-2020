import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type props = {
  buttons?: {
    text: string;
    url: string;
  }[];
};

const Menu: React.FC<props> = ({ buttons }) => {
  const { pathname } = useLocation();

  return (
    <div className="menu">
      {buttons?.map((btn, i) => {
        return (
          <div key={i} className={`menu__item ${pathname.startsWith(btn.url) ? 'active' : ''}`}>
            <Link to={btn.url}>{btn.text}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
