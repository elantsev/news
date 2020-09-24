import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils';
import './News.css';

function News () {
  const user = useSelector(state => state.user.user)
  const news = useSelector(state => state.news.news)
  return (
    <div>
      <div className="add-news">
        <h4>Для публикации новости заполните форму:</h4>
        <form className="add-news__form">
          <input className="add-news__item-header" placeholder="Введите заголовок новости" type="text" />
          <textarea placeholder="Введите текст новости" className="add-news__item-text"></textarea>
          <button className="add-news__submit" type="submit">Опубликовать</button>
        </form>
        <p className="add-news__hint">После одобрения Админом новость будет опубликована</p>
      </div>
      {news.map(({ id, title, text, createdAt }) =>
        <div key={id}>
          <h3>{title}</h3>
          <p>{text}</p>
          <p>Новость создана: {formatDate(createdAt)}</p>
          {(user.status === 'admin' || user.status === 'user') &&
            <button>Удалить</button>}
          {user.status === 'admin' &&
            <button>Одобрить</button>}
        </div>
      )}
    </div>
  );
}

export default News;
