import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

function Header () {
  return (
    <nav className="header">
      <ul className="header__link-list">
        <li className="header__link-item">
          <NavLink className="header__link" exact to="/">Главная</NavLink>
        </li>
        <li className="header__link-item">
          <NavLink className="header__link" exact to="/news">Новости</NavLink>
        </li>
        <li className="header__link-item">
          <NavLink className="header__link" exact to="/settings">Настройки</NavLink>
        </li>
      </ul>
      <button className="header__btn">Вход</button>
      <button className="header__btn">Выход</button>
    </nav>
  );
}

export default Header;
