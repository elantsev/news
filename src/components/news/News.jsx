import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils';
import AddNews from './AddNews';
import './News.css';

function News () {
  const user = useSelector(state => state.user.user)
  let news = useSelector(state => state.news.news)

  const [search, setSearch] = useState('')

  const allowedNews = getAllowedNews(news, user)
  const filteredNews = getFilteredNews(allowedNews, search)

  return (
    <div>
      <AddNews />
      <hr />
      Поиск: <input value={search} onChange={e => setSearch(e.target.value)} placeholder='введите текст' type="text" className="search" />
      <hr />
      <h2>Новости</h2>
      {filteredNews.length ? filteredNews.map(({ id, authorId, title, text, createdAt }) =>
        <div key={id} className='news-item'>
          <h3>{title}</h3>
          <p>{text}</p>
          <p>Новость создана: {formatDate(createdAt)}</p>
          {(user.status === 'admin' ||
            (user.status === 'user' && user.id === authorId)) &&
            <button>Удалить</button>}
          {user.status === 'admin' &&
            <button>Одобрить</button>}
        </div>
      ) :
        <p>увы, новостей нет</p>
      }
    </div>
  );
}

export default News;


function getAllowedNews (news, user) {
  const isAuth = user.login
  if (!isAuth) {
    return news.filter(n => n.approved)
  }
  if (user.status === 'user') {
    return news.filter(n => (n.approved || n.authorId === user.id))
  }
  if (user.status === 'admin') {
    return news
  }
  return []
}

function getFilteredNews (news, string) {
  const regExp = new RegExp(string)
  return news.filter(n => regExp.test(n.title + n.text))
}