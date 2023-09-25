import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useForm";

function Profile({ onEditInfoUser, infoUser, onLoginOut, noticeUpdate }) {

  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const { handleChange, resetForm, isValid, values } = useFormWithValidation()

  const err =
  !isValid ||
  (currentUser.name === values.name &&
    currentUser.email === values.email);

    useEffect(() => {
      currentUser ? resetForm(currentUser) : resetForm();
    }, [currentUser, resetForm]);

  // const [name, setName] = useState(infoUser.name);
  // const [email, setEmail] = useState(infoUser.email);
  
  // const [touchedName, setTouchedName] = useState(false);
  // const [touchedEmail, setTouchedEmail] = useState(false);

  // const [nameError, setNameError] = useState('Введите имя');
  // const [emailError, setEmailError] = useState('Введите почту');

  // const [formValid, setFormValid] = useState(false);
 
  // useEffect(() => {
  //   if(currentUser.name === name || currentUser.email === email) {
  //     setFormValid(false)
  //   } else {
  //     setFormValid(true)
  //   }
  // }, [name, email])
  
  // useEffect(() => {
  //   if(nameError || emailError) {
  //     setFormValid(false)
  //   } else {
  //     setFormValid(true)
  //   }
  // }, [nameError, emailError]);

  
  
  // const handleChangeName = (e) => {
  //   setName(e.target.value);
  //   if(e.target.value.length < 2) {
  //     setNameError('Имя должно быть не меньше 2 символов')
  //     if(!e.target.value) {
  //       setNameError('Введите имя')
  //     }
  //   } else {
  //     setNameError('')
  //   }
  // }
  
  // const handleChangeEmail = (e) => {
  //   setEmail(e.target.value)
  //   const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   if(!regEmail.test(String(e.target.value).toLowerCase())) {
  //     setEmailError('Некорректный email')
  //     if(!e.target.value) {
  //       setEmailError('Введите почту')
  //     }
  //   } else {
  //     setEmailError('')
  //   }
  // }

    // function blurHandler(e) {
    //   switch (e.target.name) {
    //     case 'name':
    //       setTouchedName(true)
    //       break;
    //     case 'email':
    //       setTouchedEmail(true)
    //       break;
    //       // no default
    //     }
    //  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onEditInfoUser({
      name: values.name,
      email: values.email,
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
        <h2 className="profile__heading">{`Привет, ${currentUser.name}`}</h2>
        <form
          className="form-profile"
          name='profile'
          id="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <h3 className="form-profile__heading">Имя</h3>
      <input
        value={values.name || ''}
        onChange={handleChange}
        // onBlur={blurHandler}
        autoComplete="on"
        required
        minLength="2"
        maxLength="40"
        className={`form-profile__input`}
        type="text"
        name="name"
        id="form-name"
      />
      {/* {(touchedName && nameError) && <span className="form-profile__error form-profile__error_name" id="form-name-error">{nameError}</span>} */}
      <div className="border-line"></div>
      <h3 className="form-profile__heading">E-mail</h3>
      <input
        value={values.email || ''}
        onChange={handleChange}
        // onBlur={blurHandler}
        autoComplete="on"
        required
        minLength="6"
        maxLength="40"
        className={`form-profile__input`}
        type="email"
        name="email"
        id="form-email"
      />
      {/* {(touchedEmail && emailError) && <span className="form-profile__error form-profile__error_email" id="form-email-error">{emailError}</span>} */}
      <span className="form-profile__error form-profile__error_email" >{noticeUpdate}</span>
          <button
            type="submit"
            name="create"
            form="page"
            className={`form-profile__submit-btn ${
              err && "form-profile__submit-btn_disabled"
            }`}
            disabled={err}
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
