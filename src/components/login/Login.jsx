import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Preloader from "../preloader/Preloader";
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { sendCredentials } from "../../store/user";

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const isAuth = useSelector(state => state.user.isAuth)
  const responseError = useSelector(state => state.user.responseError)
  const isSubmitting = useSelector(state => state.user.isSubmitting)

  useEffect(() => {
    if (isAuth) {
      history.push({ hash: '' });
    }
  }, [isAuth]);
  const hideLogin = (e) => {
    if (e.target.className === 'login-wrapper') {
      e.preventDefault();
      history.push({ hash: '' });
    }
  }

  return (
    <div className="login-wrapper" onClick={hideLogin} >
      <Formik
        initialValues={{ login: "admin", password: "admin-1234" }}
        onSubmit={(values) => {
          dispatch(sendCredentials(values));
        }}
        validationSchema={Yup.object().shape({
          login: Yup.string()
            .trim()
            .required("Укажите логин.")
            .min(5, "Минимальная длина логина - 5 символов."),
          password: Yup.string()
            .trim()
            .required("Укажите пароль.")
            .min(8, "Пароль слишком короткий. Минимальная длина - 8 символов.")
            .matches(/(?=.*[0-9])/, "Пароль должен содержать цифры и буквы.")
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <form onSubmit={handleSubmit} className="login">
              <div className="inputWrapper">
                <input
                  name="login"
                  type="text"
                  placeholder="Введите логин"
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.login && touched.login && "error"}
                />
                {errors.login && touched.login && (
                  <div className="input-feedback">{errors.login}</div>
                )}
              </div>
              <div className="inputWrapper">
                <input
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password && "error"}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Preloader /> : "Войти"}
              </button>
              {responseError && (
                <div className="responseError">{responseError}</div>
              )}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
