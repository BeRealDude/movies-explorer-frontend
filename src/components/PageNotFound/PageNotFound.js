import { useNavigate } from 'react-router-dom';
import './PageNotFound.css'

function PageNotFound() {
  const navigate = useNavigate();

  const handlGoBack = (e) => {
    e.preventDefault();
    navigate("/", { replace: true })
  }

    return (
      <section className='pageNotFound'>
        <h2 className='pageNotFound__hading'>404</h2>
        <p className='pageNotFound__text'>Страница не найдена</p>
        <button onClick={handlGoBack} className='pageNotFound__btn'>Назад</button>
      </section>
    );
  }
  
  export default PageNotFound;