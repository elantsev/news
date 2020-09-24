import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewsItem } from '../../store/news';


function AddNews () {
    const user = useSelector(state => state.user.user)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        if (title.trim() && text.trim) {
            dispatch(setNewsItem({ title, text, authorId: user.id }))
            setTitle('')
            setText('')
            setError('')
        } else {
            setError('Пожалуйста, укажите заголовок и текст новости')
        }
    }

    return (
        <div className="add-news">
            <h4>Для публикации новости заполните форму:</h4>
            <form className="add-news__form" onSubmit={onSubmit}>
                <input value={title} onChange={e => setTitle(e.target.value)} className="add-news__item-header" placeholder="Введите заголовок новости" type="text" />
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Введите текст новости" className="add-news__item-text"></textarea>
                <button className="add-news__submit" type="submit">Опубликовать</button>
                <p className="error">{error}</p>
            </form>
            <p className="add-news__hint">После одобрения Админом новость будет опубликована</p>
        </div>
    );
};


export default AddNews