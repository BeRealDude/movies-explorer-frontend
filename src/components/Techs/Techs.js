import './Techs.css'

function Techs() {
    return (
      <section className="techs" id="techs">
        <h2 className="techs__title">Технологии</h2>
      <div className="techs__line"></div>
      <div className='techs__container'>
      <h3 className="techs__subTitle">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="list-techs">
        <li className="list-techs__item">HTML</li>
        <li className="list-techs__item">CSS</li>
        <li className="list-techs__item">JS</li>
        <li className="list-techs__item">React</li>
        <li className="list-techs__item">Git</li>
        <li className="list-techs__item">Express.js</li>
        <li className="list-techs__item">mongoDB</li>
      </ul>
      </div>
      </section>
    );
  }
  
  export default Techs;