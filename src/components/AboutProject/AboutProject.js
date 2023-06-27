import './AboutProject.css'

function AboutProject() {
    return (
      <section className="project" id="project">
      <article className='project__wrapp'>
        <h2 className='project__title'>О проекте</h2>
        <div className="project__line"></div>
       <div className='project__container'>
        <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className='project__layout'>
          <div className='project__timeline'>1 неделя</div>
          <span className='project__timelineName'>Back-end</span>
          <div className='project__timeline'>4 недели</div>
          <span className='project__timelineName'>Front-end</span>
          </div>
      </article>
      </section>
    );
  }
  
  export default AboutProject;