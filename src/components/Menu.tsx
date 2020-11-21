import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type props = {
  buttons: {
    text: string;
    url: string;
  }[];
};

const Menu: React.FC<props> = ({ buttons }) => {
  const location = useLocation();

  return (
    <div className="menu">
      {buttons.map((btn) => {
        return (
          <div className={`menu__item ${location.pathname === btn.url ? 'active' : ''}`}>
            <Link to={btn.url}>{btn.text}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
