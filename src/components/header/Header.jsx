import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './Header.css';
import Login from '../login/Login';
import { setIsAuth, setUser } from '../../store/user';

function Header () {
  const isAuth = useSelector(state => state.user.isAuth)
  const history = useHistory();
  const dispatch = useDispatch()
  const { hash } = useLocation()

  const showLogin = () => {
    history.push({ hash: '#login' });
  }
  const logOut = () => {
    delete localStorage.user
    dispatch(setUser({}))
    dispatch(setIsAuth(false))
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
      {isAuth && <button onClick={logOut} className="header__btn">Выход</button>}
      {hash === '#login' && <Login />}
    </nav>
  );
}

export default Header;
