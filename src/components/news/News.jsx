import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveNewsItem, removeNewsItem } from '../../store/news';
import { formatDate } from '../../utils';
import AddNews from './AddNews';
import './News.css';

function News () {
  const user = useSelector(state => state.user.user)
  const isAuth = useSelector(state => state.user.isAuth)
  let news = useSelector(state => state.news.news)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const onRemove = (id) => {
    dispatch(removeNewsItem(id))
  }
  const onApprove = (id) => {
    dispatch(approveNewsItem(id))
  }




  const allowedNews = getAllowedNews(news, user)
  const filteredNews = getFilteredNews(allowedNews, search)

  return (
    <div>
      {isAuth && <AddNews />}
      <hr />
      Поиск: <input value={search} onChange={e => setSearch(e.target.value)} placeholder='введите текст' type="text" className="search" />
      <hr />
      <h2>Новости</h2>
      {filteredNews.length ? filteredNews.map(({ id, authorId, title, text, createdAt, approved }) =>
        <div key={id} className='news-item'>
          <h3>{title}</h3>
          <p>{text}</p>
          <p>Новость создана: {formatDate(createdAt)}</p>
          {(user.status === 'admin' ||
            (user.status === 'user' && user.id === authorId)) &&
            <button onClick={() => onRemove(id)}>Удалить</button>}
          {(user.status === 'admin' && !approved) &&
            <button onClick={() => onApprove(id)}>Одобрить</button>}
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