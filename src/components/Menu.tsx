import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <div className="menu__item active">
        <Link to={`/programs`}>Program</Link>
      </div>
      <div>
        <Link className="menu__item" to={`/courses`}>
          Courses
        </Link>
      </div>
      <div className="menu__item">
        <Link to={`/discover`}>Discover New</Link>
      </div>
    </div>
  );
};

export default Menu;
