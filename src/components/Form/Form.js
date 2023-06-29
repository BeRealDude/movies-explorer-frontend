import "./Form.css";
import { Link, useLocation } from "react-router-dom";
import logoHeader from "../../images/icon_logo.svg";

function Form({ data, ...props }) {
  const { onSubmit, formValid } = props;
  const location = useLocation();

  return (
    <section className={`form-section form-section_type_${data.classSelector}`}>
      <div className="form-section__container">
        <Link to="/">
          <img src={logoHeader} alt="логотип" className="header__logo" />
        </Link>
        <h2 className="form-section__heading">{data.title}</h2>
        <form
          className="form-page"
          name={data.page}
          id="page"
          onSubmit={onSubmit}
          noValidate
        >
          {props.children}
          { location.pathname === '/signup' ? 
          <button
            type="submit"
            name="create"
            form="page"
            className={`form-page__submit-btn ${
              !formValid && "form-page__submit-btn_disabled"
            }`}
            disabled={!formValid}
          >
            {data.submit}
          </button>
          : <button
          type="submit"
          name="create"
          form="page"
          className={`form-page__submit-btn-login ${
            !formValid && "form-page__submit-btn_disabled"
          }`}
          disabled={!formValid}
        >
          {data.submit}
        </button>
          }
        </form>
      </div>
    </section>
  );
}

export default Form;
