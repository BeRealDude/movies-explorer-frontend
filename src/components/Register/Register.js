import './Register.css';
import { useEffect, useState } from "react";
import Form from "../Form/Form";
import { Link, useNavigate } from "react-router-dom";







function Register({ onRegister, messageError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const [nameError, setNameError] = useState('Введите имя');
  const [emailError, setEmailError] = useState('Введите почту');
  const [passwordError, setPasswordError] = useState('Введите пароль');

  const [formValid, setFormValid] = useState(false);
  

  
  
  
  useEffect(() => {
    if(nameError || emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError, passwordError]);
  
  const handleChangeName = (e) => {
    setName(e.target.value)
    if(e.target.value.length < 2) {
      setNameError('Имя должно быть не меньше 2 символов')
      if(!e.target.value) {
        setNameError('Введите имя')
      }
    } else {
      setNameError('')
    }
  }
  
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
      setPasswordError('');
    }
    if(messageError === true) {
      setPasswordError('Что-то пошло не так...');
    }
  }
   

    function blurHandler(e) {
      switch (e.target.name) {
        case 'name':
          setTouchedName(true)
          break;
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
    onRegister({
      name: name,
      email: email,
      password: password,
    })
  }
  
  return (
    <Form
      data={{
        classSelector: "create-user",
        title: "Добро пожаловать!",
        page: "create-user",
        submit: "Зарегистрироваться",
      }}
      onSubmit={handleSubmit}
      formValid={formValid}
    >
      <h3 className="form-page__heading">Имя</h3>
      <input
        value={name || ""}
        onChange={handleChangeName}
        onBlur={blurHandler}
        autoComplete="on"
        required
        minLength="6"
        maxLength="40"
        className={`form-page__input ${(touchedName && nameError) && "form-page__input_color"}`}
        type="text"
        name="name"
        id="form-name"
      />
      {(touchedName && nameError) && <span className="form-page__error form-page__error_name" id="form-name-error">{nameError}</span>}
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
      {(touchedEmail && emailError) && <span className="form-page__error form-page__error_email" id="form-email-error">{emailError}</span>}
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
      {(touchedPassword && passwordError) && <span className="form-page__error form-page__error_password" id="form-password-error">{passwordError}</span>}
      <div className="form-page__link-wrapp">
          <p className="form-page__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="form-page__link">
            Войти
          </Link>
        </div>
    </Form>
  );
}

export default Register;
