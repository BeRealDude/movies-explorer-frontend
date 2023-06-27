import "./AboutMe.css";
import ava from "../../images/ava.jpg";
import arrow from "../../images/icon_arrow.svg";

function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__line"></div>
      <div className="aboutMe__container">
        <h3 className="aboutMe__subTitle">Владислав</h3>
        <p className="aboutMe__thesis">Фронтенд-разработчик, 25 лет</p>
        <p className="aboutMe__text">
          Родился в Ставропольском крае. На данный момент живу в
          Санкт-Петербурге. Люблю боксировать, бегать, играть на гитаре. Вот уже
          больше года изучаю программирование. С 2021-го работал в
          авто-мастерской. По окончанию курса по Веб-разработке, активно ищу
          постоянное место в it, учавствую в хакатонах.
        </p>
        <a className="aboutMe__git" href="https://github.com/BeRealDude">
          Github
        </a>
        <img className="aboutMe__img" src={ava} alt="моё фото" />
      </div>
      <div className="aboutMe__portfolio">
        <p className="aboutMe__portfolio-title">Портфолио</p>
        <ul className="projects">
          <li className="projects__item">
            <a
              className="projects__link"
              href="https://github.com/BeRealDude/how-to-learn"
            >
              Статичный сайт
              <img className="projects__arrow" src={arrow} alt="стрелка" />
            </a>
          </li>
          <li className="projects__item">
            <a
              className="projects__link"
              href="https://github.com/BeRealDude/russian-travel"
            >
              Адаптивный сайт
              <img className="projects__arrow" src={arrow} alt="стрелка" />
            </a>
          </li>
          <li className="projects__item">
            <a
              className="projects__link"
              href="https://github.com/BeRealDude/react-mesto-api-full-gha"
            >
              Одностраничное приложение
              <img className="projects__arrow" src={arrow} alt="стрелка" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
