import './Portfolio.css'
import arrow from "../../images/icon_arrow.svg";

function Portfolio() {
    return (
      <section className="portfolio">
        <p className="portfolio__title">Портфолио</p>
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
      </section>
    );
  }
  
  export default Portfolio;