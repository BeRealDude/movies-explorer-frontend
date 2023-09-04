import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile({ onEditInfoUser, infoUser, onLoginOut }) {

  const [name, setName] = useState(infoUser.name);
  const [email, setEmail] = useState(infoUser.email);
  
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const [nameError, setNameError] = useState('Введите имя');
  const [emailError, setEmailError] = useState('Введите почту');

  const [formValid, setFormValid] = useState(false);
  

  const navigate = useNavigate();
  
  
  
  useEffect(() => {
    if(nameError || emailError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError]);
  
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

    function blurHandler(e) {
      switch (e.target.name) {
        case 'name':
          setTouchedName(true)
          break;
        case 'email':
          setTouchedEmail(true)
          break;
          // no default
        }
     }

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditInfoUser({
      name: name,
      email: email,
    })
  }

  const handInOut = (e) => {
    e.preventDefault();
    onLoginOut();
    navigate("/", { replace: true })
  }
  
  return (
    <section className='profile'>
      <div className="profile__container">
        <h2 className="profile__heading">{`Привет, ${infoUser.name}`}</h2>
        <form
          className="form-profile"
          name='profile'
          id="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <h3 className="form-profile__heading">Имя</h3>
      <input
        value={name || ''}
        onChange={handleChangeName}
        onBlur={blurHandler}
        autoComplete="on"
        required
        minLength="6"
        maxLength="40"
        className={`form-profile__input ${(touchedName && nameError) && "form-profile__input_color"}`}
        type="text"
        name="name"
        id="form-name"
      />
      {(touchedName && nameError) && <span className="form-profile__error form-profile__error_name" id="form-name-error">{nameError}</span>}
      <div className="border-line"></div>
      <h3 className="form-profile__heading">E-mail</h3>
      <input
        value={email || ''}
        onChange={handleChangeEmail}
        onBlur={blurHandler}
        autoComplete="on"
        required
        minLength="6"
        maxLength="40"
        className={`form-profile__input ${(touchedEmail && emailError) && "form-profile__input_color"}`}
        type="email"
        name="email"
        id="form-email"
      />
      {(touchedEmail && emailError) && <span className="form-profile__error form-profile__error_email" id="form-email-error">{emailError}</span>}
          <button
            type="submit"
            name="create"
            form="page"
            className={`form-profile__submit-btn ${
              !formValid && "form-profile__submit-btn_disabled"
            }`}
            disabled={!formValid}
            onClick={handleSubmit}
          >
            Редактировать
          </button>
        </form>
        <button type="submit" className="profile__btn-inOut" onClick={handInOut}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
