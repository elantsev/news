import React from 'react';
import { useSelector } from 'react-redux';
import './Home.css';

function Home () {
  const login = useSelector(state => state.user.user?.login)
  return (
    <div className="home">
      <h1>Главная</h1>
      <p>Привет {login || 'Гость'}</p>
    </div>
  );
}

export default Home;
