import './Login.css';
import { useEffect, useState } from "react";
import Form from "../Form/Form";
import { Link, useNavigate } from "react-router-dom";







function Login({ onLogin }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  
  const [emailError, setEmailError] = useState('Введите почту');
  const [passwordError, setPasswordError] = useState('Введите пароль');

  const [formValid, setFormValid] = useState(false);
  
  
  
  useEffect(() => {
    if(emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError]);
  
  
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!regEmail.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email')
      if(!e.target.value) {
        setEmailError('Введите почту')
      }
    } else {
      setEmailError('')
    }
  }
  
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 7) {
      setPasswordError('Пароль должен быть не меньше 7 символов')
      if(!e.target.value) {
        setPasswordError('Введите пароль')
      }
    } else {
      setPasswordError('')
    }
  }
   

    function blurHandler(e) {
      switch (e.target.name) {
        case 'email':
          setTouchedEmail(true)
          break;
        case 'password':
          setTouchedPassword(true);
          break;
          // no default
        }
     }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: email,
      password: password,
    });
  }
  
  return (
    <Form
      data={{
        classSelector: "login-user",
        title: "Рады видеть!",
        page: "login-user",
        submit: "Войти",
      }}
      onSubmit={handleSubmit}
      formValid={formValid}
    >
      <h3 className="form-page__heading">E-mail</h3>
      <input
        value={email || ""}
        onChange={handleChangeEmail}
        onBlur={blurHandler}
        autoComplete="on"
        required
        minLength="6"
        maxLength="40"
        className={`form-page__input ${(touchedEmail && emailError) && "form-page__input_color"}`}
        type="email"
        name="email"
        id="form-email"
      />
      {(touchedEmail && emailError) && <span className="form-page__error form-page__error_email-login" id="form-email-error">{emailError}</span>}
      <h3 className="form-page__heading">Пароль</h3>
      <input
        value={password || ""}
        onChange={handleChangePassword}
        onBlur={blurHandler}
        autoComplete="on"
        required
        minLength="6"
        maxLength="40"
        className={`form-page__input ${(touchedPassword && passwordError) && "form-page__input_color"}`}
        type="password"
        name="password"
        id="form-password"
      />
      {(touchedPassword && passwordError) && <span className="form-page__error form-page__error_password-login" id="form-password-error">{passwordError}</span>}
      <div className="form-page__link-wrapp">
          <p className="form-page__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="form-page__link">
          Регистрация
          </Link>
        </div>
    </Form>
  );
}

export default Login;
