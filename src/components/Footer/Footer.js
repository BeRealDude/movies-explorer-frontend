import './Footer.css'

function Footer() {
    return (
      <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__wrapp'>
        <span className='footer__copyright'>&copy; {new Date().getFullYear()}</span>
        <div className='footer__links'>
        <a className='footer__link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
        <a className='footer__link' href='https://github.com/BeRealDude'>Github</a>
        </div>
      </div>
      </footer>
    );
  }
  
  export default Footer;