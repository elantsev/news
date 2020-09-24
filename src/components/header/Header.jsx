import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './Header.css';
import Login from '../login/Login';

function Header () {
  const isAuth = useSelector(state => state.user.isAuth)
  const history = useHistory();
  const { hash } = useLocation()

  const showLogin = () => {
    history.push({ hash: '#login' });
  }

  return (
    <nav className="header">
      <ul className="header__link-list">
        <li className="header__link-item">
          <NavLink className="header__link" exact to="/">Главная</NavLink>
        </li>
        <li className="header__link-item">
          <NavLink className="header__link" exact to="/news">Новости</NavLink>
        </li>
        {isAuth &&
          <li className="header__link-item">
            <NavLink className="header__link" exact to="/settings">Настройки</NavLink>
          </li>}
      </ul>
      {!isAuth && <button onClick={showLogin} className="header__btn">Вход</button>}
      {isAuth && <button className="header__btn">Выход</button>}
      {hash === '#login' && <Login />}
    </nav>
  );
}

export default Header;
